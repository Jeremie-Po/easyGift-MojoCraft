import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputLogin, useLoginLazyQuery } from '@/graphql/generated/schema'
import Link from 'next/link'
import { toast } from 'react-toastify'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

function Login() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [login, { data, error }] = useLoginLazyQuery({
        onCompleted: () => {
            window.location.href = '/'
        },
    })

    useEffect(() => {
        if (data) {
            if (data.login.success) {
                toast.success('Connexion réussie!')
            } else {
                toast.error(
                    'Erreur lors de la connexion: Vérifiez vos informations'
                )
            }
        }

        if (error) {
            toast.error(`Erreur lors de la connexion: ${error.message}`)
        }
    }, [data, error])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const loginData = Object.fromEntries(formData) as InputLogin
        loginData.email = loginData.email.trim()
        loginData.password = loginData.password.trim()
        if (!loginData.email || !loginData.password) {
            setErrorMessage('Veuillez renseigner tous les champs')
            return
        }
        if (loginData.email && loginData.password) {
            await login({
                variables: {
                    infos: {
                        email: loginData.email,
                        password: loginData.password,
                    },
                },
            })
        }
    }

    const handleBack = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        router.back()
    }

    return (
        <>
            <Head>
                <title>Connexion - Easy Gift</title>
            </Head>
            <div>
                {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
            </div>
            <div className='bg-gray-100 h-screen flex'>
                <img
                    src='/images/img-pages/top-view-presents-with-tag-copy-space.png'
                    alt='pile de cadeaux'
                    className='w-1/2 xl:w-2/3 h-full object-cover object-left bg-white hidden lg:block '
                />
                <div className='w-full lg:w-1/2 flex flex-col justify-center items-center gap-12'>
                    <Link
                        className={`w-80 hover:underline flex block text-gray-600 gap-2`}
                        href='#'
                        onClick={handleBack}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
                            />
                        </svg>
                        Retour
                    </Link>
                    <Link
                        href={'/'}
                        className='font-rubik text-4xl text-primaryBlue font-bold flex justify-center items-center md:justify-center md:text-4xl md:tracking-wider'
                        aria-label='Lien vers la page d’accueil'
                    >
                        <img
                            src='/images/logo/logo-easy-gift_desktop2.png'
                            alt="Logo d'easy-gift"
                            className='w-1/4'
                        />
                        <span>Easy Gift</span>
                    </Link>
                    <section className={`w-80`}>
                        <h1 className='text-2xl font-semibold mb-4'>
                            Connexion
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label
                                    htmlFor='email'
                                    className='block text-gray-600'
                                >
                                    Email
                                </label>
                                <Input
                                    className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                    data-testid='login-email'
                                    id='email'
                                    type='email'
                                    name='email'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label
                                    htmlFor='password'
                                    className='block text-gray-600'
                                >
                                    Mot de passe
                                </label>
                                <Input
                                    className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                    data-testid='login-password'
                                    id='password'
                                    type='password'
                                    name='password'
                                    required
                                />
                            </div>
                            <div className='mb-6 text-blue-500 flex justify-end'>
                                <Link
                                    href={'/auth/forgot-password'}
                                    className='hover:underline'
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                            <Button
                                data-testid='login-button'
                                type='submit'
                                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'
                            >
                                Connexion
                            </Button>
                        </form>
                        <div className='mt-6 text-blue-500 text-center'>
                            <Link
                                href={'/auth/register'}
                                className='hover:underline'
                            >
                                Pas encore de compte ?
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Login
