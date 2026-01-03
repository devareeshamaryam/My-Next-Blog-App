 import React, { useState, useEffect } from 'react'
import BlogItem from './blogitem'
import axios from 'axios'

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/blog');
            setBlogs(response.data.blogs || []);
            console.log(response.data.blogs);
            setError(null);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError("Failed to load blogs. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, [])
    
    return (
        <div className='w-full px-5 md:px-12 lg:px-28 py-8 bg-gradient-to-b from-orange-50 via-white to-slate-50'>
            {/* Category Buttons */}
            <div className='flex justify-center gap-6 my-8 flex-wrap'>
                <button 
                    onClick={() => setMenu('All')} 
                    className={menu === "All"
                        ? 'bg-gradient-to-r from-[#2C4A6B] to-[#3d5a7f] text-white py-2 px-6 rounded-sm text-sm font-semibold shadow-[0_4px_12px_rgba(230,126,80,0.4)] hover:shadow-[0_6px_20px_rgba(230,126,80,0.6)] hover:scale-105 transition-all duration-300 border-2 border-[#E67E50]'
                        : 'py-2 px-6 rounded-sm text-sm font-semibold border-2 border-[#2C4A6B] text-[#2C4A6B] hover:bg-gradient-to-r hover:from-[#E67E50] hover:to-[#D97745] hover:text-white hover:border-[#E67E50] hover:shadow-[0_4px_12px_rgba(230,126,80,0.4)] hover:scale-105 transition-all duration-300'
                    }>
                    All
                </button>
                <button 
                    onClick={() => setMenu('Entertainment')} 
                    className={menu === "Entertainment"
                        ? 'bg-gradient-to-r from-[#2C4A6B] to-[#3d5a7f] text-white py-2 px-6 rounded-sm text-sm font-semibold shadow-[0_4px_12px_rgba(230,126,80,0.4)] hover:shadow-[0_6px_20px_rgba(230,126,80,0.6)] hover:scale-105 transition-all duration-300 border-2 border-[#E67E50]'
                        : 'py-2 px-6 rounded-sm text-sm font-semibold border-2 border-[#2C4A6B] text-[#2C4A6B] hover:bg-gradient-to-r hover:from-[#E67E50] hover:to-[#D97745] hover:text-white hover:border-[#E67E50] hover:shadow-[0_4px_12px_rgba(230,126,80,0.4)] hover:scale-105 transition-all duration-300'
                    }>
                    Entertainment
                </button>
                <button 
                    onClick={() => setMenu('Technology')} 
                    className={menu === "Technology"
                        ? 'bg-gradient-to-r from-[#2C4A6B] to-[#3d5a7f] text-white py-2 px-6 rounded-sm text-sm font-semibold shadow-[0_4px_12px_rgba(230,126,80,0.4)] hover:shadow-[0_6px_20px_rgba(230,126,80,0.6)] hover:scale-105 transition-all duration-300 border-2 border-[#E67E50]'
                        : 'py-2 px-6 rounded-sm text-sm font-semibold border-2 border-[#2C4A6B] text-[#2C4A6B] hover:bg-gradient-to-r hover:from-[#E67E50] hover:to-[#D97745] hover:text-white hover:border-[#E67E50] hover:shadow-[0_4px_12px_rgba(230,126,80,0.4)] hover:scale-105 transition-all duration-300'
                    }>
                    Technology
                </button>
                <button 
                    onClick={() => setMenu('Sports')} 
                    className={menu === "Sports"
                        ? 'bg-gradient-to-r from-[#2C4A6B] to-[#3d5a7f] text-white py-2 px-6 rounded-sm text-sm font-semibold shadow-[0_4px_12px_rgba(230,126,80,0.4)] hover:shadow-[0_6px_20px_rgba(230,126,80,0.6)] hover:scale-105 transition-all duration-300 border-2 border-[#E67E50]'
                        : 'py-2 px-6 rounded-sm text-sm font-semibold border-2 border-[#2C4A6B] text-[#2C4A6B] hover:bg-gradient-to-r hover:from-[#E67E50] hover:to-[#D97745] hover:text-white hover:border-[#E67E50] hover:shadow-[0_4px_12px_rgba(230,126,80,0.4)] hover:scale-105 transition-all duration-300'
                    }>
                    Sports
                </button>
            </div>
            
            {/* Loading State */}
            {loading && (
                <div className='flex justify-center items-center py-16'>
                    <p className='text-lg text-gray-600'>Loading blogs...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className='flex justify-center items-center py-16'>
                    <p className='text-lg text-red-600'>{error}</p>
                </div>
            )}

            {/* Blog Cards Grid */}
            {!loading && !error && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 mb-16'>
                    {blogs.filter((item) => menu === "All" || item.category === menu).map((item, index) => {
                        return <BlogItem 
                            key={item._id || index} 
                            image={item.image} 
                            title={item.title} 
                            description={item.description}  
                            category={item.category} 
                            id={item._id || item.id}
                        />
                    })}
                </div>
            )}

            {/* No Blogs Found */}
            {!loading && !error && blogs.filter((item) => menu === "All" || item.category === menu).length === 0 && (
                <div className='flex justify-center items-center py-16'>
                    <p className='text-lg text-gray-600'>No blogs found in this category.</p>
                </div>
            )}
        </div>
    )
}

export default BlogList