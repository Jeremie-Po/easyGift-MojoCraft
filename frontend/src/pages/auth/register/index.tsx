import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRegisterUserMutation } from '@/graphql/generated/schema'
import { useRouter } from 'next/router'
import { getConstraints } from '@/lib/utils'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Head from 'next/head'
import Link from 'next/link'

function Register() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [register, { error }] = useRegisterUserMutation({
        onCompleted: data => {
            if (data) {
                toast.success(
                    'Inscription réussie! Vous pouvez maintenant vous connecter.'
                )
                router.push('/auth/login')
            } else {
                toast.error(
                    "Erreur lors de l'inscription: Vérifiez vos informations."
                )
            }
        },
        onError: error => {
            toast.error(`Erreur lors de l'inscription: ${error.message}`)
        },
    })

    useEffect(() => {
        if (error) {
            setErrorMessage(error.message || 'Une erreur est survenue')
        }
    }, [error])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data = Object.fromEntries(formData)
        register({
            variables: {
                data: {
                    email: data.email as string,
                    password: data.password as string,
                    pseudo: data.pseudo as string,
                },
            },
        }).catch(err => {
            setErrorMessage(err.message || 'Une erreur est survenue')
            console.error('err.message', err.message)
        })
    }

    const handleBack = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        router.back()
    }

    const errorMessages = getConstraints(
        error?.graphQLErrors[0].extensions.validationErrors
    )

    return (
        <>
            <Head>
                <title>Inscription - Easy Gift</title>
            </Head>
            <div className='bg-foreground h-screen flex'>
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
                        className='font-rubik text-4xl text-primaryMarron font-bold flex justify-center items-center md:justify-center md:text-4xl md:tracking-wider'
                        aria-label='Lien vers la page d’accueil'
                    >
                        <img
                            src='/images/logo/logo-easy-gift_desktop4.png'
                            alt="Logo d'easy-gift"
                            className='w-1/4'
                        />
                        <span>Easy Gift</span>
                    </Link>
                    <section className={`w-80`}>
                        <h1 className='text-2xl font-semibold mb-4 text-primaryMarron'>
                            Inscription
                        </h1>
                        <div>
                            {errorMessages &&
                                errorMessages.map((item, index) =>
                                    Object.values(item).map(
                                        (value: any, valueIndex) => (
                                            <p
                                                key={`${index}-${valueIndex}`}
                                                className='text-red-600'
                                            >
                                                {value}
                                            </p>
                                        )
                                    )
                                )}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label
                                    htmlFor='pseudo'
                                    className='block text-gray-600'
                                >
                                    Pseudo
                                </label>
                                <Input
                                    className='w-full border border-border rounded-md py-2 px-3 focus:outline-none focus:border text-primaryMarron'
                                    id='pseudo'
                                    type='text'
                                    name='pseudo'
                                />
                            </div>

                            <div className='mb-4'>
                                <label
                                    htmlFor='email'
                                    className='block text-gray-600'
                                >
                                    Email{' '}
                                    <span className='text-red-600'>*</span>
                                </label>
                                <Input
                                    className='w-full border border-border rounded-md py-2 px-3 focus:outline-none focus:border text-primaryMarron'
                                    id='email'
                                    type='email'
                                    name='email'
                                    required
                                />
                            </div>

                            <div className='mb-8'>
                                <label
                                    htmlFor='password'
                                    className='block text-gray-600'
                                >
                                    Mot de passe{' '}
                                    <span className='text-red-600'>*</span>
                                </label>
                                <Input
                                    className='w-full border border-border rounded-md py-2 px-3 focus:outline-none focus:border text-primaryMarron'
                                    id='password'
                                    type='password'
                                    name='password'
                                    required
                                />
                            </div>

                            <Button
                                type='submit'
                                className='bg-primaryMarron hover:underline text-white font-semibold rounded-md py-2 px-4 w-full'
                            >
                                Créer mon compte
                            </Button>
                            <p className='text-red-600'>
                                * Champs obligatoires
                            </p>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Register
