import React from 'react';

const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center gap-2'>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5b0e0e]"></div>
        </div>
    );
};

export default Loading;