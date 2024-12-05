const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Student schema
const studentSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', // Reference to the User model (ensure 'User' model is created)
    },
    subject: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    rollNo: {
        type: String,
        required: false, // Optional field for roll number
    },
    message: {
        type: String,
        required: false, // Optional field for message
    }
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create an index to enforce uniqueness on the 'subject' field
studentSchema.index({ subject: 1 }, { unique: true });

// Export the Student model (Ensure this is exported correctly)
module.exports = mongoose.model('Student', studentSchema);
