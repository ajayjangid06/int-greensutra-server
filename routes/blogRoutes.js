import express from 'express';
const router = express.Router();
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getBlogs).post(protect, createBlog);
router
  .route('/:id')
  .put(protect, updateBlog)
  .delete(protect, admin, deleteBlog);

export default router;
