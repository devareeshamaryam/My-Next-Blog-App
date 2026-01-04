// File: app/api/admin/addBlog/route.js

import connectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/blogmodel";
import { NextResponse } from "next/server";
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

// Connect to database when module loads
const LoadDB = async () => {
    try {
        await connectDB();
        console.log(" Database connection initialized");
    } catch (error) {
        console.error(" Database connection failed:", error);
    }
}
LoadDB();

// GET handler - fetch blogs
export async function GET(request) {
    try {
        await connectDB();
        
        const blogId = request.nextUrl.searchParams.get("id");
        
        if (blogId) {
            const blog = await BlogModel.findById(blogId);
            
            if (!blog) {
                return NextResponse.json(
                    { success: false, msg: "Blog not found" },
                    { status: 404 }
                );
            }
            
            return NextResponse.json({ 
                success: true, 
                blog 
            });
        }
        
        // Fetch all blogs
        const blogs = await BlogModel.find({}).sort({ date: -1 });
        
        return NextResponse.json({ 
            success: true,
            count: blogs.length,
            blogs 
        });
        
    } catch (error) {
        console.error("❌ Error in GET:", error);
        return NextResponse.json({ 
            success: false, 
            msg: "Failed to fetch blogs",
            error: error.message 
        }, { status: 500 });
    }
}

// POST handler - add new blog
export async function POST(request) {
    try {
        console.log("🚀 POST request received");
        
        // Ensure DB is connected
        await connectDB();
        
        // Parse form data
        const formData = await request.formData();
        
        const title = formData.get('title');
        const description = formData.get('description');
        const category = formData.get('category');
        const author = formData.get('author');
        const image = formData.get('image');
        
        console.log('📝 Received data:', { 
            title, 
            description: description?.substring(0, 50) + '...', 
            category, 
            author,
            imageType: image?.type 
        });
        
        // Validate required fields
        if (!title || !description || !category || !image) {
            console.error("❌ Missing required fields");
            return NextResponse.json(
                { 
                    success: false, 
                    msg: "All fields are required (title, description, category, image)" 
                }, 
                { status: 400 }
            );
        }

        // Validate image type
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!validImageTypes.includes(image.type)) {
            return NextResponse.json(
                { 
                    success: false, 
                    msg: "Invalid image type. Please upload JPG, PNG, WEBP or GIF" 
                }, 
                { status: 400 }
            );
        }

        // Validate image size (5MB max)
        if (image.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { 
                    success: false, 
                    msg: "Image size must be less than 5MB" 
                }, 
                { status: 400 }
            );
        }

        // Upload image to public folder
        console.log("📤 Uploading image...");
        const timestamp = Date.now();
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        
        // Clean filename - remove spaces and special characters
        const cleanName = image.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${timestamp}_${cleanName}`;
        const filepath = path.join(process.cwd(), 'public', filename);
        
        try {
            await writeFile(filepath, buffer);
            console.log('✅ Image uploaded:', filename);
        } catch (fileError) {
            console.error("❌ File upload failed:", fileError);
            return NextResponse.json(
                { 
                    success: false, 
                    msg: "Failed to upload image",
                    error: fileError.message 
                }, 
                { status: 500 }
            );
        }
        
        const imgUrl = `/${filename}`;
        
        // Prepare blog data
        const blogData = {
            title: title.trim(),
            description: description.trim(),
            category,
            author: author?.trim() || 'Areesha Maryam',
            image: imgUrl,
            authorImg: '/default-author.png',
            date: new Date()
        };
        
        console.log('💾 Saving blog to database...');
        
        // Save to MongoDB
        const savedBlog = await BlogModel.create(blogData);
        
        console.log('✅ Blog saved successfully!');
        console.log('📄 Blog ID:', savedBlog._id);
        
        return NextResponse.json({ 
            success: true,
            msg: "Blog Added Successfully",
            blogId: savedBlog._id,
            data: savedBlog
        }, { status: 201 });
        
    } catch (error) {
        console.error("❌ Error in POST /api/admin/addBlog:");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Full error:", error);
        
        return NextResponse.json(
            { 
                success: false, 
                msg: "Failed to add blog",
                error: error.message 
            }, 
            { status: 500 }
        );
    }
}

// DELETE handler - delete blog
export async function DELETE(request) {
    try {
        await connectDB();
        
        const id = request.nextUrl.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json(
                { success: false, msg: "Blog ID is required" },
                { status: 400 }
            );
        }
        
        // Find the blog to get image path
        const blog = await BlogModel.findById(id);
        
        if (!blog) {
            return NextResponse.json(
                { success: false, msg: "Blog not found" },
                { status: 404 }
            );
        }
        
        // Delete image file from public folder
        if (blog.image) {
            const imagePath = path.join(process.cwd(), 'public', blog.image);
            try {
                await unlink(imagePath);
                console.log(' Image deleted:', blog.image);
            } catch (fileError) {
                console.warn(' Could not delete image file:', fileError.message);
                // Continue with blog deletion even if image deletion fails
            }
        }
        
        // Delete blog from database
        await BlogModel.findByIdAndDelete(id);
        
        console.log('✅ Blog deleted successfully:', id);
        
        return NextResponse.json({ 
            success: true,
            msg: "Blog Deleted Successfully"
        });
        
    } catch (error) {
        console.error("❌ Error in DELETE:", error);
        return NextResponse.json({ 
            success: false, 
            msg: "Failed to delete blog",
            error: error.message 
        }, { status: 500 });
    }
}