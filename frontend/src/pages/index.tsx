import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/components/ui/carousel'
import { useRouter } from 'next/router'
import { checkUserConnected } from '@/utils/checkConnection'
import { useUserGroupsQuery, UserGroupsQuery } from '@/graphql/generated/schema'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import GroupCard from '@/components/GroupCard'
import FakeDataGroups from '@/components/group/fakeDataGroups'
import Head from 'next/head'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'

gsap.registerPlugin(useGSAP)

export default function Home() {
    const router = useRouter()
    const isConnected = checkUserConnected()
    const [groups, setGroups] = useState<UserGroupsQuery['userGroups']>([])

    const today = new Date()

    const { data, loading, error } = useUserGroupsQuery({
        fetchPolicy: 'cache-and-network',
        skip: !isConnected, // Skip the query if not connected
    })

    useEffect(() => {
        if (data?.userGroups) {
            setGroups(data.userGroups)
        } else {
            setGroups([])
        }
    }, [data, isConnected])

    if (loading) {
        console.log('En cours de chargement de vos groupes...')
    }

    if (error) {
        console.error('Error fetching user groups:', error)
    }

    const { group1, link1, group2, link2, group3, link3 } = FakeDataGroups()

    const handleButtonClick = () => {
        if (isConnected) {
            router.push('/creating-groups')
        } else {
            router.push('/auth/login')
        }
    }

    const container = useRef<HTMLElement | null>(null)

    useGSAP(
        () => {
            // gsap code here...
            gsap.from('.image1', {
                duration: 3,
                opacity: 0,
            })
            gsap.from('.text1', {
                ease: 'power3.out',
                duration: 3,
                y: '20',
                opacity: 0,
            })
        },
        { scope: container }
    ) // <-- scope is for selector text (optional)

    return (
        <div className='scroll-snap-y scroll-snap-mandatory'>
            <Head>
                <title>Page d'accueil - Easy Gift</title>
            </Head>
            <div className='bg-rose-100 flex flex-col justify-center items-center'>
                <section
                    ref={container}
                    className='flex flex-col gap-3 mt-5 mb-12 justify-center items-center w-10/12 lg:mt-20 lg:gap-10'
                >
                    <div className='w-full lg:flex lg:justify-center'>
                        <h1 className='text1 text-3xl font-bold text-primaryRed lg:text-4xl'>
                            Principe
                        </h1>
                    </div>
                    <div className='w-full flex justify-center'>
                        <p className='w-full text-lg text-gray-700 font-medium lg:text:xl'>
                            Fini les cadeaux en double et les discussions
                            secrètes sur WhatsApp !
                        </p>
                    </div>
                    <div className='flex flex-col gap-5 lg:gap-0 lg:flex-row justify-center items-center'>
                        <div className='flex flex-col gap-5 lg:gap-10 lg:w-1/2'>
                            <div className='paragraphe1 max-w-3xl mx-auto flex flex-col gap-4'>
                                <p className='text-base text-gray-700 lg:text-lg'>
                                    Easy Gift est votre espace privé pour
                                    coordonner les cadeaux de Noël en famille ou
                                    entre amis. Chaque membre dispose de son
                                    propre fil de discussion, invisible pour lui
                                    mais accessible aux autres, permettant
                                    d'organiser sereinement les cadeaux tout en
                                    préservant l'effet de surprise.
                                </p>
                                <p className='text-base text-gray-700 lg:text-lg'>
                                    Discutez des idées, coordonnez les achats
                                    groupés, et assurez-vous que chacun reçoive
                                    des cadeaux qui lui feront vraiment plaisir
                                    - le tout dans un seul espace organisé et
                                    confidentiel.
                                </p>
                            </div>
                            <div className={'flex justify-end'}>
                                <Button className={'w-40'}>
                                    <Link href='/creating-groups'>
                                        Créer un groupe
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className='hidden lg:w-1/2 max-w-3xl md:block'>
                            <Image
                                src='/images/img-pages/hero-img.png'
                                alt="Photo d'une femme recevant un cadeaux"
                                width={963}
                                height={712}
                                priority={true}
                                style={{ objectFit: 'cover' }}
                                className={'image1 bg-cover'}
                            />
                        </div>
                    </div>
                </section>
                <section className='flex flex-col gap-10 mb-12 w-10/12 justify-center items-center bg-rose-100'>
                    <div className='w-full '>
                        <h2 className='w-4/5 lg:flex lg:justify-center text-3xl md:text-4xl 4xl:text-5xl font-bold lg:w-full 2xl:mt-32 text-primaryRed'>
                            Comment ça marche ?
                        </h2>
                    </div>
                    <div className='bg-rose-50 w-full flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl'>
                        <div className='flex flex-col gap-3 items-center'>
                            <div>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='size-10 text-primaryRed'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                    />
                                </svg>
                            </div>
                            <div className='flex justify-center text-xl sm:text-2xl font-medium'>
                                1. Créez votre évenement
                            </div>
                            <p className='text-base text-gray-700 lg:text-lg'>
                                Créez un évenement pour votre famille ou vos
                                amis et invitez-les à le rejoindre
                            </p>
                        </div>
                    </div>
                    <div className='bg-rose-50 w-full flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl'>
                        <div className='flex flex-col gap-3 items-center'>
                            <div>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='size-10 text-primaryRed'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
                                    />
                                </svg>
                            </div>
                            <div className='flex justify-center text-xl sm:text-2xl font-medium'>
                                2. Discutez des cadeaux
                            </div>
                            <p className='text-base text-gray-700 lg:text-lg'>
                                Chaque membre a son fil de discussion dédié où
                                les autres peuvent partager leurs idées
                            </p>
                        </div>
                    </div>
                    <div className='bg-rose-50 w-full flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl'>
                        <div className='flex flex-col gap-3 items-center'>
                            <div>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='size-10 text-primaryRed'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                                    />
                                </svg>
                            </div>
                            <div className='flex justify-center text-xl sm:text-2xl font-medium'>
                                3. Gardez la surprise
                            </div>
                            <p className='text-base text-gray-700 lg:text-lg'>
                                Vous ne pouvez pas voir les discussions
                                concernant vos propres cadeaux
                            </p>
                        </div>
                    </div>
                </section>
                <section className='flex flex-col gap-10 mb-12 w-10/12 justify-center items-center bg-rose-100'>
                    {(!isConnected ||
                        (isConnected && groups && groups?.length < 1)) && (
                        <>
                            <div className='w-full '>
                                <h2 className='w-4/5 lg:flex lg:justify-center text-3xl md:text-4xl 4xl:text-5xl font-bold lg:w-full 2xl:mt-32 text-primaryRed'>
                                    Retrouves tes événements
                                </h2>
                            </div>
                            <p className='w-full lg:flex lg:justify-center text-base text-gray-700 lg:text-lg'>
                                Voici un exemple d'événements qui ont été créés{' '}
                            </p>
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 justify-center items-center'>
                                <GroupCard
                                    key='1'
                                    group={group1}
                                    link={link1}
                                />
                                <GroupCard
                                    key='2'
                                    group={group2}
                                    link={link2}
                                />
                                <GroupCard
                                    key='3'
                                    group={group3}
                                    link={link3}
                                />
                            </div>
                        </>
                    )}

                    {isConnected && groups && groups.length > 0 && (
                        <>
                            <div className='w-full lg:flex lg:justify-center'>
                                <h2 className='w-4/5 text-3xl sm:text-center md:text-4xl 4xl:text-5xl font-bold lg:w-full 2xl:mt-32 text-primaryRed'>
                                    Mes groupes
                                </h2>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-center'>
                                {groups.map(group => (
                                    <GroupCard
                                        key={group.id}
                                        group={group}
                                        link={`/group/${group.id}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}
