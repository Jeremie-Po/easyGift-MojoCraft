import ModalModifyAvatar from '@/components/profil/modalModifyAvatar'
import ModalModifyDetails from '@/components/profil/modalModifyDetails'
import ModalModifyPassword from '@/components/profil/ModalModifyPassword'
import { useGetUserInfosQuery } from '../../graphql/generated/schema'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Head from 'next/head'

export default function Profile() {
    const [isModalAvatarOpen, setIsModalAvatarOpen] = useState(false)
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false)
    const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false)

    const {
        data: userData,
        loading: userLoading,
        error: userError,
    } = useGetUserInfosQuery()

    const user = userData?.getUserInfos
    const avatarId = user?.avatar?.id

    if (userLoading) return <h1>Loading...</h1>
    if (userError) {
        toast.error(userError.message)
        return <h1>Error: {userError.message}</h1>
    }

    return (
        <>
            <Head>
                <title>Mon profil - Easy Gift</title>
            </Head>
            <section className='w-full mt-5 flex-grow flex flex-col gap-6 pb-6 justify-center items-center text-primaryMarron lg:mt-20'>
                <div className='flex flex-col gap-6 mb-12 w-11/12 justify-between items-center bg-foreground border-2 border-border rounded-2xl p-8'>
                    <div className='w-full md:w-4/5'>
                        <h1 className='flex justify-center text-xl mb-4 md:text-2xl lg:text-3xl 2xl:text-4xl font-bold lg:mb-8'>
                            Informations personnelles
                        </h1>
                        <div className='w-full bg-background p-8 border border-border rounded-2xl'>
                            <p className='text-md text-left mb-3 md:mb-4 lg:mb-6 xl:mb-8 2xl:mb-10 2xl:text-xl'>
                                Gère les informations de ton compte Easy Gift.
                            </p>
                            <div className='flex flex-col gap-6 md:flex-row justify-between items-center'>
                                <div className='w-full md:w-3/4'>
                                    <div className='flex items-center h-9 md:h-11 lg:h-12 2xl:h-14'>
                                        <p className='text-base font-semibold w-32'>
                                            Pseudo
                                        </p>
                                        <p className='text-base'>
                                            {user?.pseudo}
                                        </p>
                                    </div>
                                    <Separator />
                                    <div className='flex items-center h-9 md:h-11 lg:h-12 2xl:h-14'>
                                        <p className='text-base font-semibold w-32'>
                                            Email
                                        </p>
                                        <p className='text-base'>
                                            {user?.email}
                                        </p>
                                    </div>
                                    <Separator />
                                    <div className='flex items-center h-9 md:h-11 lg:h-12 2xl:h-14'>
                                        <p className='text-base font-semibold w-32'>
                                            Mot de passe
                                        </p>
                                        <a
                                            href='#'
                                            className='text-primaryBlue'
                                            onClick={() =>
                                                setIsModalPasswordOpen(true)
                                            }
                                        >
                                            Modifier
                                        </a>
                                    </div>
                                </div>
                                <div className='mb-3 2xl:mb-7 flex justify-center w-full md:w-1/4'>
                                    <div
                                        className='relative w-24 h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32'
                                        onClick={() =>
                                            setIsModalAvatarOpen(
                                                !isModalAvatarOpen
                                            )
                                        }
                                    >
                                        <img
                                            src={user?.avatar?.url}
                                            className='absolute inset-0 w-24 h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32 rounded-full mr-2 border-solid border-4 border-primaryRed'
                                            alt='Avatar of the user'
                                        />
                                        <div className='absolute inset-0 rounded-full flex justify-center items-center text-2xl text-primaryBlue font-semibold opacity-0 hover:opacity-100 duration-300 bg-stone-100 bg-opacity-75'>
                                            Modifier
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-10 flex justify-end'>
                                <Button
                                    onClick={() =>
                                        setIsModalDetailsOpen(
                                            !isModalDetailsOpen
                                        )
                                    }
                                >
                                    Modifier mes informations
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {isModalAvatarOpen && (
                <ModalModifyAvatar
                    isOpen={isModalAvatarOpen}
                    handleClose={() => setIsModalAvatarOpen(!isModalAvatarOpen)}
                    avatarId={avatarId}
                    type='profil'
                />
            )}
            {isModalDetailsOpen && user && (
                <ModalModifyDetails
                    isOpen={isModalDetailsOpen}
                    handleClose={() =>
                        setIsModalDetailsOpen(!isModalDetailsOpen)
                    }
                    user={user}
                />
            )}
            {isModalPasswordOpen && (
                <ModalModifyPassword
                    isOpen={isModalPasswordOpen}
                    handleClose={() =>
                        setIsModalPasswordOpen(!isModalPasswordOpen)
                    }
                />
            )}
        </>
    )
}
