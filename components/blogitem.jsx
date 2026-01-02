 import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'

const BlogItem = ({title, description, category, image,id}) => {
 
    return (
        <div className='bg-white border-2 border-[#2C4A6B] hover:shadow-[-7px_7px_0px_#E67E50] transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:border-[#E67E50] group'>
            <Link href={`/blog/${id}`}> 
            <Image 
                src={image} 
                alt={title} 
                width={400} 
                height={250} 
                className='border-b-2 border-[#2C4A6B] w-full h-[220px] object-cover group-hover:brightness-110 transition-all duration-300'
            />
            </Link>
            
            <p className='ml-5 mt-5 px-2 py-1 inline-block bg-gradient-to-r from-[#E67E50] to-[#D97745] text-white text-xs font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300'>
                {category}
            </p>
            
            <div className='p-5'>
                <h5 className='mb-2 text-lg font-semibold tracking-tight text-[#2C4A6B] line-clamp-2 group-hover:text-[#E67E50] transition-colors duration-300'>
                    {title}
                </h5>
                <p className='mb-3 text-sm tracking-tight text-gray-700 line-clamp-3'>
                    {description}
                </p>
                <Link href={`/blog/${id}`} className='inline-flex items-center gap-2 font-semibold text-sm text-[#2C4A6B] hover:text-[#E67E50] hover:gap-3 transition-all duration-300 group/link'>
                    Read more
                    <svg className='w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default BlogItem