const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Schema definition
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    wallet: {
        type: Number,
        default: 0
    },
    roles: [{
        role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
    }],
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to hash the password before saving
adminSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash; // Save the hashed password

            next(); // Proceed to save the admin
        });
    });
});

// Method to compare entered password with the hashed password
adminSchema.methods.authenticate = function(password) {
    return bcrypt.compare(password, this.password);
};

// Method to generate JWT token for the admin
adminSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, email: this.email }, 'your_jwt_secret_key', { expiresIn: '1h' });
    return token;
};

// Export the Admin model
module.exports = mongoose.model('Admin', adminSchema);
