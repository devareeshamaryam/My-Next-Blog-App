 'use client'
import { assets } from '@/Assets/assets';
import React, { useEffect, useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/footer';
import axios from 'axios';

const Page = ({params}) => {  
    const {id} = use(params);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch from the blog API endpoint
                const response = await axios.get('/api/blog', {
                    params: {
                        id: id
                    }
                });
                
                // Check if response is successful
                if (response.data.success) {
                    setData(response.data.blog);
                } else {
                    setError('Blog not found');
                }
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError(err.response?.data?.msg || 'Failed to load blog');
            } finally {
                setLoading(false);
            }
        }
        
        if (id) {
            fetchBlogData();
        }
    }, [id]);
    
    // Loading state
    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#E67E50] mx-auto'></div>
                    <p className='mt-4 text-[#2C4A6B] font-semibold'>Loading blog...</p>
                </div>
            </div>
        );
    }
    
    // Error state
    if (error) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50'>
                <div className='text-center'>
                    <div className='text-6xl mb-4'>❌</div>
                    <h2 className='text-2xl font-bold text-[#2C4A6B] mb-2'>Error</h2>
                    <p className='text-gray-600 mb-4'>{error}</p>
                    <Link href='/'>
                        <button className='px-6 py-2 bg-[#E67E50] text-white rounded-lg hover:bg-[#d16d42] transition-colors'>
                            Go Back Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
    
    // Main content
    return (data ? <>
        <div className='py-3 px-5 md:px-12 lg:px-28 bg-gradient-to-br from-slate-50 to-orange-50'>
            <div className='flex justify-between items-center'>
                <Link href='/'>
                    <Image 
                        src={assets.image2} 
                        alt='Logo' 
                        width={180}
                        height={180}
                        className='w-[70px] sm:w-[100px] transition-transform duration-300 hover:scale-110 cursor-pointer'
                    />
                </Link>
                <button className='flex items-center gap-1 font-medium py-1 px-3 sm:py-1.5 sm:px-4 text-xs sm:text-sm border-2 border-solid border-[#2C4A6B] shadow-[-5px_5px_0px_#2C4A6B] hover:bg-gradient-to-r hover:from-[#2C4A6B] hover:to-[#3d5a7f] hover:text-white hover:shadow-[-7px_7px_0px_#E67E50] transition-all duration-300 active:translate-x-[-2px] active:translate-y-[2px] active:shadow-[-3px_3px_0px_#2C4A6B]'>
                    Get Started 
                </button>
            </div>
            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto text-[#2C4A6B] hover:text-[#E67E50] transition-colors duration-300'>
                    {data.title}
                </h1>
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto text-gray-700'>
                    Author: <span className='text-[#E67E50] font-semibold'>{data.author}</span>
                </p>
                {data.date && (
                    <p className='text-sm text-gray-500'>
                        {new Date(data.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </p>
                )}
            </div>
        </div>
        
        <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
            <div className='relative w-full h-[400px] sm:h-[500px]'>
                <Image 
                    className='border-4 border-[#E67E50] shadow-[0_8px_30px_rgba(230,126,80,0.3)] hover:shadow-[0_12px_40px_rgba(230,126,80,0.5)] hover:scale-[1.02] transition-all duration-300 object-cover' 
                    src={data.image} 
                    fill
                    alt={data.title}
                    priority
                />
            </div>
            
            <div className='bg-white p-6 sm:p-8 rounded-lg shadow-lg mt-8'>
                <div className='flex items-center gap-3 mb-6'>
                    <span className='px-4 py-1 bg-[#E67E50] text-white text-sm rounded-full font-medium'>
                        {data.category}
                    </span>
                </div>
                
                <h1 className='my-8 text-[26px] font-semibold text-[#2C4A6B] border-l-4 border-[#E67E50] pl-4 hover:text-[#E67E50] transition-colors duration-300'>
                    Introduction:
                </h1>
                
                <div className='prose prose-lg max-w-none'>
                    <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
                        {data.description}
                    </p>
                </div>
            </div>
            
            <div className='my-24'>
                <p className='text-[#2C4A6B] font-semibold my-4 text-lg'>Share this article on Social Media</p>
                <div className='flex gap-3'>
                    {/* Facebook Icon */}
                    <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                    >
                        <svg className='cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_12px_rgba(24,119,242,0.8)]' width="40" height="40" viewBox="0 0 24 24" fill="#1877F2">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </a>
                    
                    {/* Twitter Icon */}
                    <a 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(data.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Twitter"
                    >
                        <svg className='cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_12px_rgba(29,161,242,0.8)]' width="40" height="40" viewBox="0 0 24 24" fill="#1DA1F2">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                    </a>
                    
                    {/* LinkedIn Icon (better alternative to Google+) */}
                    <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                    >
                        <svg className='cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_12px_rgba(0,119,181,0.8)]' width="40" height="40" viewBox="0 0 24 24" fill="#0077B5">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <Footer/>
    </> : null);
}

export default Page;