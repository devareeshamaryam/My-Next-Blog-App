// File: app/api/admin/addProduct/route.js

import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/blogmodel";  // ⬅️ CRITICAL: Must import
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import path from 'path';

// Connect to database when module loads
const LoadDB = async () => {
    try {
        await ConnectDB();
        console.log("✅ Database connection initialized");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
}
LoadDB();

// GET handler - for testing
export async function GET(request) {
    try {
        await ConnectDB();
        const blogs = await BlogModel.find().limit(5);
        return NextResponse.json({ 
            success: true,
            msg: "API working",
            count: blogs.length
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        });
    }
}

// POST handler - add new blog
export async function POST(request) {
    try {
        console.log("🚀 POST request received");
        
        // Ensure DB is connected
        await ConnectDB();
        
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
            author 
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

        // Upload image to public folder
        console.log("📤 Uploading image...");
        const timestamp = Date.now();
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        
        // Clean filename - remove spaces and special characters
        const cleanName = image.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${timestamp}_${cleanName}`;
        const filepath = path.join(process.cwd(), 'public', filename);
        
        await writeFile(filepath, buffer);
        const imgUrl = `/${filename}`;
        
        console.log('✅ Image uploaded:', imgUrl);
        
        // Prepare blog data
        const blogData = {
            title: title.trim(),
            description: description.trim(),
            category,
            author: author?.trim() || 'Areesha Maryam',
            image: imgUrl,
            authorImg: '/default-author.png',  // You can make this dynamic later
            date: new Date()
        };
        
        console.log('💾 Saving blog to database...');
        
        // Save to MongoDB
        const savedBlog = await BlogModel.create(blogData);
        
        console.log('✅ Blog saved successfully!');
        console.log('📄 Blog ID:', savedBlog._id);
        console.log('📊 Database:', BlogModel.db.name);
        
        return NextResponse.json({ 
            success: true,
            msg: "Blog Added Successfully",
            blogId: savedBlog._id,
            data: savedBlog
        });
        
    } catch (error) {
        console.error("❌ Error in POST /api/admin/addProduct:");
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