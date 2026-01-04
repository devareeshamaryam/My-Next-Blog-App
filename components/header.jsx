 'use client'

import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'

const Header = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append("email", email);
            
            const response = await axios.post('/api/email', formData);
            
            if (response.data.success) {
                setMessage(response.data.msg || 'Subscribed successfully!');
                setEmail("");
                
                // 3 seconds baad message hide kar do
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage("Error: Could not subscribe");
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            setMessage("Failed to subscribe. Please try again.");
            setTimeout(() => setMessage(''), 3000);
            console.error(error);
        }
    }
         
    return (
        <div className='py-3 px-5 md:px-12 lg:px-28 bg-gradient-to-br from-slate-50 to-orange-50'>
            <div className='flex justify-between items-center'>
                <Link href="/">
                    <Image 
                        src={assets.image2} 
                        alt='Logo' 
                        width={100}
                        height={100}
                        className='w-[70px] sm:w-[100px] transition-transform duration-300 hover:scale-110 cursor-pointer'
                    />
                </Link>
                <Link href="/blog">
                    <button className='flex items-center gap-1 font-medium py-1 px-3 sm:py-1.5 sm:px-4 text-xs sm:text-sm border-2 border-solid border-[#2C4A6B] shadow-[-5px_5px_0px_#2C4A6B] hover:bg-gradient-to-r hover:from-[#2C4A6B] hover:to-[#3d5a7f] hover:text-white hover:shadow-[-7px_7px_0px_#E67E50] transition-all duration-300 active:translate-x-[-2px] active:translate-y-[2px] active:shadow-[-3px_3px_0px_#2C4A6B]'>
                        Get Started 
                    </button>
                </Link>
            </div>
            
            <div className='text-center mt-6 mb-4'>
                <h1 className='text-xl sm:text-3xl font-medium text-[#2C4A6B] hover:text-[#E67E50] transition-colors duration-300'>
                    Latest Blogs
                </h1>
                
                <form 
                    onSubmit={onSubmitHandler}
                    className='flex justify-between max-w-[280px] sm:max-w-[320px] mx-auto mt-6 border-2 border-[#2C4A6B] shadow-[-3px_3px_0px_#E67E50] hover:shadow-[-5px_5px_0px_#E67E50] hover:border-[#E67E50] transition-all duration-300 bg-white'
                >
                    <input 
                        type='email' 
                        placeholder='Enter your email' 
                        className='pl-2 py-1.5 outline-none text-xs flex-1 focus:bg-orange-50 transition-colors duration-300' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <button 
                        type='submit' 
                        className='border-l-2 border-[#2C4A6B] py-1.5 px-3 text-xs font-medium bg-gradient-to-r from-[#E67E50] to-[#D97745] text-white hover:from-[#2C4A6B] hover:to-[#3d5a7f] hover:shadow-[inset_0_0_10px_rgba(230,126,80,0.5)] active:scale-95 transition-all duration-300'>
                        Subscribe
                    </button>
                </form>
                
                {message && (
                    <p className='text-xs sm:text-sm text-green-600 font-medium mt-2 animate-fade-in'>
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Header