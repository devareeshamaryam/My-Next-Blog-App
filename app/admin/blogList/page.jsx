 'use client'
import React, { useEffect, useState } from 'react'
import BlogTableItem from '@/components/AdminComponents/BlogTableItem'
import axios from 'axios'

const Page = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all blogs
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/blog');
            
            if (response.data.success) {
                setBlogs(response.data.blogs);
            } else {
                setError('Failed to fetch blogs');
            }
        } catch (err) {
            console.error('Error fetching blogs:', err);
            setError(err.response?.data?.msg || 'Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    // Delete blog
    const deleteBlog = async (blogId) => {
        if (!confirm('Are you sure you want to delete this blog?')) {
            return;
        }

        try {
            const response = await axios.delete(`/api/blog?id=${blogId}`);
            
            if (response.data.success) {
                // Remove deleted blog from state
                setBlogs(blogs.filter(blog => blog._id !== blogId));
                alert('Blog deleted successfully!');
            }
        } catch (err) {
            console.error('Error deleting blog:', err);
            alert('Failed to delete blog');
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>All Blogs</h1>
            
            <div className='relative max-w-[1200px] overflow-x-auto mt-4 border border-gray-300 rounded-lg shadow-sm'>
                {loading ? (
                    <div className='flex items-center justify-center h-[400px]'>
                        <div className='text-center'>
                            <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mx-auto'></div>
                            <p className='mt-4 text-gray-600'>Loading blogs...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className='flex items-center justify-center h-[400px]'>
                        <div className='text-center'>
                            <p className='text-red-600 font-semibold'>{error}</p>
                            <button 
                                onClick={fetchBlogs}
                                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className='flex items-center justify-center h-[400px]'>
                        <p className='text-gray-500 text-lg'>No blogs found. Create your first blog!</p>
                    </div>
                ) : (
                    <table className='w-full text-sm text-gray-500'>
                        <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='hidden sm:table-cell px-6 py-3'>
                                    Author Name
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Blog Title
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Category
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Date
                                </th>
                                <th scope='col' className='px-6 py-3 text-center'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <BlogTableItem 
                                    key={blog._id}
                                    blogId={blog._id}
                                    title={blog.title}
                                    author={blog.author}
                                    category={blog.category}
                                    date={blog.date}
                                    authorImg={blog.authorImg}
                                    onDelete={deleteBlog}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Page