 import React from 'react'

const SubsTableItem = ({ email, date, mongoId, deleteEmail }) => {
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this subscription?')) {
            deleteEmail(mongoId);
        }
    };

    return (
        <tr className='bg-white border-b hover:bg-gray-50'>
            <td className='px-6 py-4 font-medium text-gray-900'>
                {email || "No Email"}
            </td>
            <td className='hidden sm:table-cell px-6 py-4'>
                {date ? formatDate(date) : "No Date"}
            </td>
            <td className='px-6 py-4'>
                <button 
                    onClick={handleDelete}
                    className='text-red-600 hover:text-red-800 font-medium cursor-pointer transition-colors'
                >
                    ✕ Delete
                </button>
            </td>
        </tr>
    )
}

export default SubsTableItem