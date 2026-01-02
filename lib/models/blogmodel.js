// File: lib/models/blogmodel.js

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Technology', 'Lifestyle', 'Business', 'Startup', 'Other']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        default: 'Areesha Maryam'
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    authorImg: {
        type: String,
        default: '/default-author.png'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt
});

// Check if model already exists (prevents recompilation errors)
const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default BlogModel;