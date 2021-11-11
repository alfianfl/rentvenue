import React from 'react';

import {InfoCard} from '../../../components/Card';
import Map from '../../../components/Map';

import { format } from 'date-fns';
import { useRouter } from 'next/dist/client/router';
import dummy from "../../../assets/dummy.jpg";

import moment from "moment";
function search({searchResult}) {
    const router = useRouter();
    const {location, startDate, endDate, noOfGuests} = router.query;

    console.log(searchResult);

    const formatedStartDate = format(new Date(startDate), "dd MMMM yyyy")
    const formatedEndDate = format(new Date(endDate), "dd MMMM yyyy")
    const range = `${formatedStartDate} - ${formatedEndDate}`

    return (
        <div className="relative">
            <div className="flex">
                <section className="flex-grow pt-16 px-6">
                    <p className="text-xs">{range} for {noOfGuests} guests </p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden sm:inline-flex lg:inline-flex mb-5 whitespace-nowrap space-x-3 text-gray-800">
                        <p className="button">Cancelation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">More filters</p>
                    </div>
                    <div className="flex flex-col">
                        {
                            searchResult.data.length === 0 ? <h1 className="text-2xl font-bold">Data tidak ditemukan...</h1>
                            :
                            searchResult.data.map(item=> (
                                <InfoCard 
                                    id={item.id}
                                    key={item.id}
                                    img={item.Venue_Photos[0].url}
                                    description={item.description}
                                    title={item.name}
                                    price={item.price}
                                    total={"/Day"}
                                    location={item.city}

                                />
                            ))
                        }
                    </div>
                </section>
                <section className="hidden xl:inline-flex xl:min-w:[600px] h-screen sticky top-0">
                    <Map searchResult={searchResult.data}/>
                </section>

            </div>
        </div>
    )
}

export async function getServerSideProps({ query }){
    
    const {location, startDate, endDate, noOfGuests} = query; 
    const startBook = moment(startDate);
    const endBook = moment(endDate);

    startBook.format("YYYY-MM-DD");
    endBook.format("YYYY-MM-DD");

    const searchResult = await fetch(`https://rentavenue-backend.herokuapp.com/api/venue/search?city=${location}&capacity=${noOfGuests}&start_book=${startBook}&finish_book=${endBook}`)
        .then(res=> res.json());
    
    return{
        props: {
            searchResult
        }
    }

}

export default search
