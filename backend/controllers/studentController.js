// backend/controllers/studentController.js - CORRECTED AND COMPLETE
const Student = require('../models/studentModel');
const User = require('../models/userModel');

// @desc    Get all students with pagination
// @route   GET /api/students
// @access  Private/Admin
const getAllStudents = async (req, res) => {
  const pageSize = 5; // How many students per page
  const page = Number(req.query.pageNumber) || 1; // Get page number from URL query, default to 1

  try {
    const count = await Student.countDocuments({}); // Get total count of students
    const students = await Student.find({})
      .populate('user', 'id name')
      .limit(pageSize) // Limit the results to the page size
      .skip(pageSize * (page - 1)); // Skip students from previous pages

    res.json({
      students,
      page,
      pages: Math.ceil(count / pageSize) // Calculate total number of pages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get student's own profile
// @route   GET /api/students/profile
// @access  Private
const getStudentProfile = async (req, res) => {
  const student = await Student.findOne({ user: req.user._id });

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student profile not found' });
  }
};

// @desc    Update student's own profile
// @route   PUT /api/students/profile
// @access  Private
const updateStudentProfile = async (req, res) => {
  const student = await Student.findOne({ user: req.user._id });

  if (student) {
    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.course = req.body.course || student.course;

    const user = await User.findById(req.user._id);
    if (user) {
        user.name = student.name;
        user.email = student.email;
        await user.save();
    }

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};

// @desc    Admin: Update any student record
// @route   PUT /api/students/:id
// @access  Private/Admin
const updateStudentByAdmin = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
     student.name = req.body.name || student.name;
     student.email = req.body.email || student.email;
     student.course = req.body.course || student.course;

     const updatedStudent = await student.save();
     res.json(updatedStudent);
  } else {
     res.status(404).json({ message: 'Student not found' });
  }
}

// @desc    Admin: Delete a student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    await User.deleteOne({ _id: student.user });
    await student.deleteOne();
    res.json({ message: 'Student removed' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};

// --- THIS IS THE CRUCIAL PART ---
// Make sure ALL functions are exported here.
module.exports = { 
    getAllStudents, 
    getStudentProfile, 
    updateStudentProfile, 
    updateStudentByAdmin, 
    deleteStudent 
};