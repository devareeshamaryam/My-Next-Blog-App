 'use client'
import { assets, blog_data } from '@/Assets/assets';
import React, { useEffect, useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/footer';


const Page = ({params}) => {  
    const {id} = use(params);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchBlogData = () => {
            for(let i=0; i<blog_data.length; i++) {
                if(Number(id) === blog_data[i].id) {
                    setData(blog_data[i]);
                    console.log(blog_data[i]);
                    break;
                }
            }
        }
        
        fetchBlogData();
    }, [id])
    
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
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto text-[#2C4A6B] hover:text-[#E67E50] transition-colors duration-300'>{data.title}</h1>
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto text-gray-700'>Author: <span className='text-[#E67E50] font-semibold'>{data.author}</span></p>
            </div>
        </div>
        
        <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
            <Image 
                className='border-4 border-[#E67E50] shadow-[0_8px_30px_rgba(230,126,80,0.3)] hover:shadow-[0_12px_40px_rgba(230,126,80,0.5)] hover:scale-[1.02] transition-all duration-300' 
                src={data.image} 
                width={1280} 
                height={720} 
                alt='' 
            />
            <h1 className='my-8 text-[26px] font-semibold text-[#2C4A6B] border-l-4 border-[#E67E50] pl-4 hover:text-[#E67E50] transition-colors duration-300'>Introduction:</h1>
            <p className='text-gray-700 leading-relaxed'>{data.description}</p>
            <div className='my-24'>
                <p className='text-[#2C4A6B] font-semibold my-4 text-lg'>Share this article on Social Media</p>
                <div className='flex gap-3'>
                    {/* Facebook Icon */}
                    <svg className='cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_12px_rgba(24,119,242,0.8)]' width="40" height="40" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    
                    {/* Twitter Icon */}
                    <svg className='cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_12px_rgba(29,161,242,0.8)]' width="40" height="40" viewBox="0 0 24 24" fill="#1DA1F2">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    
                    {/* Google Plus Icon */}
                    <svg className='cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_12px_rgba(219,68,55,0.8)]' width="40" height="40" viewBox="0 0 24 24" fill="#DB4437">
                        <path d="M7.635 10.909v2.619h4.335c-.173 1.125-1.31 3.295-4.335 3.295-2.512 0-4.57-2.058-4.57-4.589s2.058-4.589 4.57-4.589c1.399 0 2.364.609 2.904 1.134l2.081-2.053c-1.35-1.260-3.104-2.024-4.985-2.024C3.551 4.592 0 8.143 0 12.234s3.551 7.642 7.635 7.642c4.41 0 7.332-3.098 7.332-7.463 0-.502-.054-.885-.12-1.267H7.635zm16.365 0h-2.183V8.726h-2.183v2.183h-2.182v2.181h2.182v2.183h2.183v-2.183H24z"/>
                    </svg>
                </div>
            </div>
        </div>
        <Footer/>

    </> : <></>)
}

export default Page