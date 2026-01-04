 'use client'
import React, { useEffect, useState } from 'react'
import SubsTableItem from '@/components/AdminComponents/SubsTableItem'
import axios from 'axios'

const Page = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);  // ✅ Yeh add karo

    const fetchEmails = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/email');
            
            if (response.data.success) {
                setEmails(response.data.emails);
            }
        } catch (error) {
            console.error('Error fetching emails:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteEmail = async (id) => {
        try {
            const response = await axios.delete(`/api/email?id=${id}`);
            
            if (response.data.success) {
                setEmails(emails.filter(email => email._id !== id));
                alert('Email deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting email:', error);
            alert('Failed to delete email');
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1 className='text-2xl font-semibold mb-4'>All Subscriptions</h1>
            
            <div className='relative max-w-[800px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50 sticky top-0'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                Email Subscription
                            </th>
                            <th scope='col' className='hidden sm:table-cell px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={3} className='text-center py-8'>
                                    <div className='flex justify-center items-center'>
                                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                                    </div>
                                </td>
                            </tr>
                        ) : emails.length === 0 ? (
                            <tr>
                                <td colSpan={3} className='text-center py-8 text-gray-500'>
                                    No subscriptions yet
                                </td>
                            </tr>
                        ) : (
                            emails.map((email) => (
                                <SubsTableItem 
                                    key={email._id}
                                    email={email.email}
                                    date={email.date}
                                    mongoId={email._id}
                                    deleteEmail={deleteEmail}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page