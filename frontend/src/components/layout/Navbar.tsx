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
        <div className={`sticky top-0 bg-rose-100`}>
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
                            <DropdownMenuContent className='w-56 bg-rose-50'>
                                <DropdownMenuLabel>Compte</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href='/mon-profil'>
                                        <DropdownMenuItem
                                            className={'focus:bg-rose-100'}
                                        >
                                            Profil
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel
                                    className={'focus:bg-rose-100'}
                                >
                                    Mes évènements
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href='/groupes'>
                                        <DropdownMenuItem
                                            className={'focus:bg-rose-100'}
                                        >
                                            Liste
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href='/creating-groups'>
                                        <DropdownMenuItem
                                            className={'focus:bg-rose-100'}
                                        >
                                            Créer
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => logout()}
                                    className={'focus:bg-rose-100'}
                                >
                                    Déconnexion
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        ) : (
                            <DropdownMenuContent className='w-56 bg-rose-50'>
                                <Link href='/auth/login'>
                                    <DropdownMenuItem
                                        className={'focus:bg-rose-100'}
                                    >
                                        Connexion
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        )}
                    </DropdownMenu>
                </div>
                {/*logo*/}
                <div className={`md:flex md:justify-center md:col-start-1`}>
                    <Link
                        href='/'
                        className='font-rubik text-2xl text-primaryBlue font-bold flex justify-end items-center md:justify-center md:text-4xl md:tracking-wider'
                        aria-label='Lien vers la page d’accueil'
                    >
                        <img
                            src='/images/logo/logo-easy-gift_desktop2.png'
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
                        <nav className='flex justify-around h-full items-center'>
                            <Link
                                href='/groupes'
                                className={`${currentPath === '/groupes' ? 'font-bold' : ''} hover:bg-rose-200 px-4 h-full flex items-center`}
                            >
                                MES ÉVÉNEMENTS
                            </Link>
                            <Link
                                href='/creating-groups'
                                className={`${currentPath === '/creating-groups' ? 'font-bold' : ''} hover:bg-rose-200 px-4 h-full flex items-center`}
                            >
                                NOUVEL ÉVÉNEMENT
                            </Link>
                            <Link
                                href='/mon-profil'
                                className={`${currentPath === '/mon-profil' ? 'font-bold' : ''} hover:bg-rose-200 px-4 h-full flex items-center`}
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
