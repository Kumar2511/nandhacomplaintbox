const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* A common gotcha for beginners is that the unique option for schemas is not a validator.
It's a convenient helper for building MongoDB unique indexes. */
const facultySchema = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    subject: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    rollNo: {
        type: String,
    },
    message: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

exports.Faculty = mongoose.model('faculty', facultySchema);