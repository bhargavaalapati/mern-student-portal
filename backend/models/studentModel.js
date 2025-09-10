// backend/models/studentModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Link to the User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
    default: 'MERN Bootcamp',
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;