 import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";

// POST - Subscribe email
export async function POST(request) {
    try {
        await connectDB();
        
        const formData = await request.formData();
        const email = formData.get('email');
        
        if (!email) {
            return NextResponse.json({
                success: false,
                msg: "Email is required"
            }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                msg: "Invalid email format"
            }, { status: 400 });
        }

        const existingEmail = await EmailModel.findOne({ email });
        
        if (existingEmail) {
            return NextResponse.json({
                success: false,
                msg: "This email is already subscribed!"
            }, { status: 409 });
        }

        await EmailModel.create({ email });
        
        console.log('✅ New email subscribed:', email);
        
        return NextResponse.json({
            success: true,
            msg: "Thank you for subscribing!"
        }, { status: 201 });
        
    } catch (error) {
        console.error("❌ Email API Error:", error);
        return NextResponse.json({
            success: false,
            msg: "Something went wrong. Please try again."
        }, { status: 500 });
    }
}

// GET - Fetch all emails
export async function GET(request) {
    try {
        await connectDB();
        
        const emails = await EmailModel.find({}).sort({ date: -1 });
        
        console.log(`✅ Fetched ${emails.length} emails`);
        
        return NextResponse.json({
            success: true,
            count: emails.length,
            emails
        });
        
    } catch (error) {
        console.error("❌ Error fetching emails:", error);
        return NextResponse.json({
            success: false,
            msg: "Failed to fetch emails"
        }, { status: 500 });
    }
}

// DELETE - Delete email ⭐ YEH ADD KARO
export async function DELETE(request) {
    try {
        await connectDB();
        
        const id = request.nextUrl.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({
                success: false,
                msg: "Email ID is required"
            }, { status: 400 });
        }
        
        const deletedEmail = await EmailModel.findByIdAndDelete(id);
        
        if (!deletedEmail) {
            return NextResponse.json({
                success: false,
                msg: "Email not found"
            }, { status: 404 });
        }
        
        console.log('✅ Email deleted:', deletedEmail.email);
        
        return NextResponse.json({
            success: true,
            msg: "Email deleted successfully"
        });
        
    } catch (error) {
        console.error("❌ Error deleting email:", error);
        return NextResponse.json({
            success: false,
            msg: "Failed to delete email"
        }, { status: 500 });
    }
}s