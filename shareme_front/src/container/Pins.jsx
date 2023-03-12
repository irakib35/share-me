import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components';

export default function Pins({user}) {
    const [searchTerm, setSearchTerm] = useState('');
    return (    
        <div className='px-2 md:px-5'>
            <div className='bg-grey-50'>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
            </div>
            <div className='h-full'>
                <Routes>
                    <Route path='/' element={<Feed />}/>
                    <Route path='/category/:categoryId' element={<Feed />}/>
                    <Route path='/pin-detail/:pinId' element={<PinDetail user={user}/>}/>
                    <Route path='/create-pin' element={<CreatePin user={user}/>}/>
                    <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
                    <Route path='/' element={<Feed/>}/>
                </Routes>
            </div>
        </div>
    )
}
