import { SmilePlusIcon } from 'lucide-react';
import React from 'react';

const DashboardLayout = () => {
    return (
        <div>
            <h1 className='items-center justify-center flex font-semibold'>Hello Admin, Welcome to Your Universe!!</h1>
            <span className='justify-center items-center flex mt-4'> <SmilePlusIcon></SmilePlusIcon></span>      
        </div>
    );
};

export default DashboardLayout;