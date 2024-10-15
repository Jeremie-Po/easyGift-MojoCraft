import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-screen min-h-screen bg-bgPrimary relative flex flex-col justify-between'>
            <div className='w-full max-w-screen-2xl mx-auto'>
                <Navbar />
            </div>
            <main className='w-full max-w-screen-2xl mx-auto h-auto flex flex-grow flex-col'>
                {children}
            </main>

            <Footer />
        </div>
    )
}
