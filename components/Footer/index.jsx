import React from 'react'

function Footer() {
    return (
        <div className=" grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600 ">
            <div className="space-y-4 text-xs text-gray-800">
                <h5 className="font-bold">About</h5>
                <p>Newsroom</p>
                <p>Investors</p>
            </div>
            <div className="space-y-4 text-xs text-gray-800">
                <h5 className="font-bold">Commutinty</h5>
                <p>Accessibility</p>
                <p>This is not real site</p>
                <p>Its a pretty awesome clone</p>
                <p>Referrals accepted</p>
                <p>papafarm</p>
            </div>
            <div className="space-y-4 text-xs text-gray-800">
                <h5 className="font-bold">Support</h5>
                <p>Newsroom</p>
                <p>Investors</p>
            </div>
            <div className="space-y-4 text-xs text-gray-800">
                <h5 className="font-bold">Host</h5>
                <p>Newsroom</p>
                <p>Investors</p>
            </div>        
        </div>
    )
}

export default Footer
