import React from 'react';
import {SidebarVendor} from "../../components/Sidebar";

const navMenu = [
    {
        href: "/vendor/analisis",
        nama: "Analisis"
    },
    {
        href: "/vendor/venue",
        nama: "Venue"
    },
    {
        href: "/vendor/transaksi",
        nama: "Transaksi"
    },
    {
        href: "/vendor/checkIn-checkOut",
        nama: "Check-in/CheckOut"
    },
    // {
    //     href: "/vendor/feedback",
    //     nama: "Feedback"
    // },
    {
        href: "/vendor/profile/persolnalInformation",
        nama: "Profile"
    },
    {
        href: "",
        nama: "Logout"
    },
]

function VendorLayout({children}) {
    return (
        <div  style={{backgroundColor:"#E5E5E5", cursor:"pointer"}}>
            <SidebarVendor navMenu={navMenu}>
                {children}
            </SidebarVendor>
        </div>
    )
}

export default VendorLayout
