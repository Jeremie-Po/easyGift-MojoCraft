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
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Navbar() {
    const isConnected = checkUserConnected()
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
    return (
        <div className={`sticky top-0 shadow-lg bg-bgPrimary z-10`}>
            <div className={`flex justify-around md:grid md:grid-cols-3`}>
                {/*burger menu icon */}
                <div className={`flex justify-center md:hidden`}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button aria-label='Ouvrir ou fermer la navigation'>
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
                            {/*burger menu content*/}
                        </DropdownMenuTrigger>
                        {isConnected ? (
                            <DropdownMenuContent className='w-56'>
                                <DropdownMenuLabel>Compte</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href='/mon-profil'>
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
                                    <Link href='/groupes'>
                                        <DropdownMenuItem>
                                            Liste
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href='/creating-groups'>
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
                                <Link href='/auth/login'>
                                    <DropdownMenuItem>
                                        Connexion
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        )}
                    </DropdownMenu>
                </div>
                {/*logo*/}
                <div
                    className={`md:flex md:justify-center ${isConnected ? 'md:col-start-1' : 'md:col-start-2'}`}
                >
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
                {/*Navigation*/}
                <div
                    className={`hidden ${isConnected ? 'md:col-start-2 md:col-span-3' : 'md:col-start-3'} md:flex md:justify-around md:items-center`}
                >
                    {isConnected && (
                        <nav className='flex justify-around gap-4'>
                            <Link
                                href='/groupes'
                                className={`${currentPath === '/groupes' ? 'font-bold' : ''} hover:underline`}
                            >
                                MES ÉVÉNEMENTS
                            </Link>
                            <Link
                                href='/creating-groups'
                                className={`${currentPath === '/creating-groups' ? 'font-bold' : ''} hover:underline`}
                            >
                                NOUVEL ÉVÉNEMENT
                            </Link>
                            <Link
                                href='/mon-profil'
                                className={`${currentPath === '/mon-profil' ? 'font-bold' : ''} hover:underline`}
                            >
                                MON PROFIL
                            </Link>
                        </nav>
                    )}
                    {/*connexion/deconnexion icone*/}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='virgin'>
                                <Image
                                    src='/images/icones/connexion.png'
                                    alt='icone de connexion'
                                    width={35}
                                    height={35}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        {isConnected ? (
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => logout()}>
                                    Déconnexion
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        ) : (
                            <DropdownMenuContent>
                                <Link href='/auth/login'>
                                    <DropdownMenuItem>
                                        Connexion
                                    </DropdownMenuItem>
                                </Link>
                                <Link href='/auth/register'>
                                    <DropdownMenuItem>
                                        Inscription
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        )}
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}
