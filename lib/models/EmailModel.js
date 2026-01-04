 import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,  
        unique: true,     // Duplicate emails prevent karne ke liye
        lowercase: true,  // Emails ko lowercase mein store karega
        trim: true        // Extra spaces remove karega
    },
    date: {
        type: Date,
        default: Date.now  // Date.now() nahi, Date.now (without parentheses)
    }
});

 
const EmailModel = mongoose.models.email || mongoose.model('email', Schema);

export default EmailModel;