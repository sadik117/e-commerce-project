import React from 'react';

const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center gap-2'>
            <span className="loading loading-spinner text-[#eb6060] text-2xl"></span>
            <span className="loading loading-spinner text-[#eb6060] text-2xl"></span>
            <span className="loading loading-spinner text-[#eb6060] text-2xl"></span>
        </div>
    );
};

export default Loading;