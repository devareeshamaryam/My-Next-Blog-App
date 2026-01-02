 import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return(
        <div className='flex flex-col bg-slate-100 min-h-screen'>
            <div className='px-2 sm:pl-14 py-3 border border-black'>
                <Image src={assets.image2} width={120} alt='Logo' />
            </div>
            <div className='w-28 sm:w-80 relative py-12 border border-black flex-1'>
               <div className='w-[50%] sm:w-[80%] absolute right-0'>
                    <Link href='/admin/addProduct' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <p>➕ Add Blogs</p>
                    </Link>
               </div>
               
               <div className='w-[50%] sm:w-[80%] absolute right-0 mt-16'>
                    <Link href='/admin/blogList' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <p>✏︎ Blog List</p>
                    </Link>
               </div>
               
               <div className='w-[50%] sm:w-[80%] absolute right-0 mt-32'>
                    <Link href='/admin/subscription' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <p>📩 Subscription</p>
                    </Link>
               </div>
            </div>
        </div>
    )
}

export default Sidebar