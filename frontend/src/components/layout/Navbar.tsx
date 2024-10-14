import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { checkUserConnected } from '@/utils/checkConnection'
import { useRouter } from 'next/router'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLogoutLazyQuery } from '@/graphql/generated/schema'
import { toast } from 'react-toastify'

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar'

export default function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const isConnected = checkUserConnected()
    const menuRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const currentPath = router.pathname
    const [logout] = useLogoutLazyQuery({
        onCompleted: () => {
            toast.success('Déconnexion réussie!')
            router.push('/').then(() => {
                window.location.reload()
            })
        },
        onError: error => {
            toast.error(`Erreur lors de la déconnexion: ${error.message}`)
        },
        fetchPolicy: 'cache-and-network',
    })

    const closeMenu = () => setMenuOpen(false)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                closeMenu()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className={`sticky top-0 shadow-lg bg-bgPrimary z-10`}>
            <div className={`flex justify-around md:grid md:grid-cols-3`}>
                <div className={`flex justify-center md:hidden`}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                aria-label='Ouvrir ou fermer la navigation'
                                onClick={() => setMenuOpen(!isMenuOpen)}
                                // className='md:hidden'
                            >
                                <svg
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                </svg>
                            </button>
                        </DropdownMenuTrigger>
                        {isConnected ? (
                            <DropdownMenuContent className='w-56'>
                                <DropdownMenuLabel>Compte</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link
                                        href='/mon-profil'
                                        onClick={closeMenu}
                                    >
                                        <DropdownMenuItem>
                                            Profil
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>
                                    Mes évènements
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href='/groupes' onClick={closeMenu}>
                                        <DropdownMenuItem>
                                            Liste
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link
                                        href='/creating-groups'
                                        onClick={closeMenu}
                                    >
                                        <DropdownMenuItem>
                                            Créer
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => logout()}>
                                    Déconnexion
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        ) : (
                            <DropdownMenuContent className='w-56'>
                                <Link onClick={closeMenu} href='/auth/login'>
                                    <DropdownMenuItem>
                                        Connexion
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        )}
                    </DropdownMenu>
                </div>
                <div className={`md:col-start-2 md:flex md:justify-center`}>
                    <Link
                        href='/'
                        className='font-rubik text-2xl text-primaryBlue font-bold flex justify-end items-center md:justify-center md:text-4xl md:tracking-wider'
                        aria-label='Lien vers la page d’accueil'
                    >
                        <img
                            src='/images/logo/logo-easy-gift_desktop.png'
                            alt="Logo d'easy-gift"
                            className='w-1/4'
                        />
                        <span>Easy Gift</span>
                    </Link>
                </div>
                <div className='hidden md:col-start-3 md:flex md:justify-center md:items-center'>
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger>Mon compte</MenubarTrigger>
                            <MenubarContent>
                                {isConnected ? (
                                    <>
                                        <MenubarItem>
                                            <Link href='/mon-profil'>
                                                Mon profil
                                            </Link>
                                        </MenubarItem>
                                        <MenubarItem onClick={() => logout()}>
                                            déconnexion
                                        </MenubarItem>
                                    </>
                                ) : (
                                    <MenubarItem>
                                        <Link href='/auth/login'>
                                            Connexion
                                        </Link>
                                    </MenubarItem>
                                )}
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>
            {isConnected && (
                <div className={`grid grid-cols-3 p-3 hidden md:block`}>
                    <div className='col-start-2 flex justify-evenly'>
                        <>
                            <Link
                                href='/groupes'
                                className={`${currentPath === '/groupes' ? 'underline' : ''}`}
                            >
                                MES ÉVÉNEMENTS
                            </Link>
                            <Link
                                href='/creating-groups'
                                className={`${currentPath === '/creating-groups' ? 'underline' : ''}`}
                            >
                                NOUVEL ÉVÉNEMENT
                            </Link>
                        </>
                    </div>
                </div>
            )}
        </div>
    )
}
