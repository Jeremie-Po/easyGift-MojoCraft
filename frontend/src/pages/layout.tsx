import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import React from 'react'
import { useRouter } from 'next/router'

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const hideNavbarRoutes = ['/auth/login', '/auth/register']
    const hideNavbar = hideNavbarRoutes.includes(router.pathname)

    return (
        <div className='w-screen min-h-screen background relative flex flex-col justify-between'>
            <div className='border-b-2 border-outline bg-bgNav'>
                <div className='w-full max-w-screen-2xl mx-auto'>
                    {!hideNavbar && <Navbar />}
                </div>
            </div>
            <main className='w-full max-w-screen-2xl mx-auto h-auto flex flex-grow flex-col'>
                {children}
            </main>

            {!hideNavbar && <Footer />}
        </div>
    )
}
