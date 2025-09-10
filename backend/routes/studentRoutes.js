// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentProfile,
  updateStudentProfile,
  updateStudentByAdmin,
  deleteStudent,
} = require('../controllers/studentController');
const { protect, admin } = require('../middleware/authMiddleware');

// --- CORRECT ROUTE ORDER ---

// STUDENT'S OWN PROFILE ROUTE (most specific, so it comes first)
// This route does NOT have the 'admin' middleware
router
  .route('/profile')
  .get(protect, getStudentProfile)
  .put(protect, updateStudentProfile);

// ADMIN ROUTES (more generic routes come after specific ones)
router.route('/').get(protect, admin, getAllStudents);

router
  .route('/:id')
  .delete(protect, admin, deleteStudent)
  .put(protect, admin, updateStudentByAdmin);


module.exports = router;