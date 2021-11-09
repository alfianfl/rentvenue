import React, {useState} from 'react'

import logo from "../../assets/Logo.png";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

import Image from 'next/image';
import {
    SearchIcon,
    GlobeAltIcon,
    UserCircleIcon,
    UsersIcon,
    MenuIcon

} from '@heroicons/react/solid'
import { useRouter } from 'next/dist/client/router';
import Dropdown from '../Dropdown';

function Headers() {
    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();


    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    
    const resetInput = () => {
        setSearchInput("");
        setStartDate(new Date());
        setEndDate(new Date());
    }

    const search = () => {
        router.push({
            pathname: '/tenant/search',
            query: {
                location:searchInput,
                startDate:startDate.toISOString(),
                endDate:endDate.toISOString(),
                noOfGuests,
            }
        });
        setSearchInput("");
    }

    return (
        <header className="sticky bg-white top-0 z-50 grid grid-cols-3 shadow-md p-5 md:px-10">
            <div  className="relative flex items-center my-auto h-10 cursor-pointer">
                <Image 
                    onClick={() => router.push("/tenant")}
                    src={logo}
                    layout='fill'
                    objectFit='contain'
                    objectPosition='left'
                />
            </div>
            <div className='flex  items-center md:shadow-sm md:border-2 rounded-full py-2 '>
                <input 
                    type="text" 
                    value={searchInput} 
                    onChange={(e)=>setSearchInput(e.target.value)}
                    className="flex-grow pl-5 text-sm text-gray-600 bg-transparent outline-none" 
                    placeholder="Start your search" />
                <SearchIcon style={{backgroundColor:'#207ED6'}} className="h-8 bg-blue-800 text-white rounded-full p-2 cursor-pointer hidden md:inline-flex md:mx-2"/>
            </div>
            <div className="flex items-center justify-end space-x-4 text-gray-500">
                <p className="hidden md:hidden cursor-pointer md:inline">Become a host</p>
                <GlobeAltIcon className='h-6 hidden md:hidden' />
                <Dropdown>
                    <div className="flex items-center space-x-2 border-2 rounded-full p-2 cursor-pointer">
                        <MenuIcon className='h-6'/>
                        <UserCircleIcon className="h-6" />
                    </div>
                </Dropdown>
            </div>

            {searchInput && (
                <div className='flex flex-col col-span-3 mx-auto mt-2'>
                    <DateRangePicker 
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["049ADA"]}
                        onChange={handleSelect}

                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                        <UsersIcon 
                            className="h-5"
                        />
                        <input 
                            value={noOfGuests}
                            onChange={e=>setNoOfGuests(e.target.value)}
                            min={1}
                            type="number" 
                            className="w-12 pl-2 text-lg text-black-400 outline-none" 
                        />
                    </div>
                    <div className="flex">
                        {/* Emmet for react */}
                        <button onClick={resetInput} className="flex-grow text-gray-500 outline-none">Cancel</button>
                        <button onClick={search} className="flex-grow text-black-500 outline-none">Search</button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Headers
