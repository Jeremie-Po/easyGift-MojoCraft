import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputLogin, useLoginLazyQuery } from '@/graphql/generated/schema'
import Link from 'next/link'
import { toast } from 'react-toastify'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'

function Login() {
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

    return (
        <>
            <Head>
                <title>Connexion - Easy Gift</title>
            </Head>
            <div>
                {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
            </div>
            <div className='bg-gray-100 flex justify-center items-center h-screen'>
                <div className=' h-screen hidden lg:block'>
                    <img
                        src='/images/img-pages/illustration-gift-boxes.jpg'
                        alt='pile de cadeaux'
                        className='object-contain w-full h-full objet-cover'
                    />
                </div>
                <div className='lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2'>
                    <h1 className='text-2xl font-semibold mb-4 text-primaryBlue'>
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
                        {/*<div className='mb-4 flex items-center'>*/}
                        {/*    <input type='checkbox' id='remember' name='remember' className='text-blue-500'/>*/}
                        {/*    <label htmlFor='remember' className='text-gray-600 ml-2'>Remember Me</label>*/}
                        {/*</div>*/}
                        <div className='mb-6 text-blue-500'>
                            <Link
                                href={'/auth/forgot-password'}
                                className='hover:underline'
                            >
                                J'ai oublié mon mot de passe
                            </Link>
                        </div>
                        <Button
                            data-testid='login-button'
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full'
                        >Se connecter
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
                </div>
            </div>
        </>
    )
}

export default Login
