 'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
import { ToastContainer, toast } from 'react-toastify'

const AddProducts = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Entertainment",  
        author: "Areesha Maryam"
    })
    
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;  
        setData(data => ({...data, [name]: value}))
    }
    
    const onSubmitHandler = async (e) => {   
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('image', image);   
        
        try {
            const response = await axios.post('/api/blog', formData);  
            console.log(response.data);
            
            // Success ke baad form reset
            if (response.data.success) {
                toast.success(response.data.msg);
                setImage(false);
                setData({
                            title: "",
                            description: "",
                            category: "Entertainment",  
                            author: "Areesha Maryam"

                })
            } else {
                toast.error("Error")
            }
        } catch (error) {
            toast.error("Error")
        }
    }
 
    return (
        <>
        <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>   
            <p className='text-xl'>Upload thumbnail</p>
            <label htmlFor="image">
                <Image 
                    className='mt-4 cursor-pointer' 
                    src={!image ? assets.upload : URL.createObjectURL(image)} 
                    width={140} 
                    height={70} 
                    alt='' 
                />
            </label>
            <input 
                onChange={(e) => setImage(e.target.files[0])}
                type="file" 
                id='image' 
                hidden 
                required 
            />
            
            <p className='text-xl mt-4'>Blog title</p>
            <input 
                name='title' 
                onChange={onChangeHandler} 
                value={data.title}
                className='w-full sm:w-[500px] mt-4 px-4 py-3 border' 
                type='text' 
                placeholder='Type here' 
                required 
            />
            
            <p className='text-xl mt-4'>Blog Description</p>
            <textarea 
                name='description' 
                onChange={onChangeHandler} 
                value={data.description}
                className='w-full sm:w-[500px] mt-4 px-4 py-3 border' 
                placeholder='Write content here' 
                rows={6} 
                required 
            />
            
            <p className='text-xl mt-4'>Blog Category</p>
            <select 
                name="category"  
                onChange={onChangeHandler} 
                value={data.category}  
                className='w-full sm:w-[500px] mt-4 px-4 py-3 border text-gray-500'
            >
                <option value="Entertainment">Entertainment</option>
                <option value="Technology">Technology</option>
                <option value="Sports">Sports</option>
            </select>
            <br />
            <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>
                ADD
            </button>
        </form>
        </>
    )
}

export default AddProducts