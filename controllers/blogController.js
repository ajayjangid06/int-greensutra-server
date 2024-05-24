import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate('user', 'username');
  res.json(blogs);
});

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const blog = new Blog({
    title,
    content,
    user: req.user._id,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title;
    blog.content = content;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  // console.log(req.params);
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.findOneAndDelete({_id: req.params.id});
    res.json({ message: 'Blog removed', id: req.params.id});
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

export { getBlogs, createBlog, updateBlog, deleteBlog };
