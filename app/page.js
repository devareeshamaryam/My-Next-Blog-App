'use client'
import BlogList from "@/components/bloglist"
import Header from "@/components/header"
 import React from 'react'
 import Footer from "@/components/footer"
 import { ToastContainer } from "react-toastify"
 import 'react-toastify/dist/ReactToastify.css'
 
 export default function Home() {
  return (
    <>
    <ToastContainer theme="dark"/>
    <Header/>
    <BlogList />
    <Footer/>
     </>
  )
 }
 
  