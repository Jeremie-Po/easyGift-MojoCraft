import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
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
            <div className='flex flex-col justify-center items-center'>
                <section
                    ref={container}
                    className='flex flex-col gap-3 mt-5 mb-12 w-11/12 justify-center items-center border-outline border-2 rounded-2xl p-8 lg:mt-20 lg:gap-10 bg-foreground'
                >
                    <div className='w-full lg:flex lg:justify-center'>
                        <h1 className='text1 text-xl font-bold text-primaryMarron lg:text-2xl'>
                            Fini les cadeaux en double et les discussions
                            secrètes sur WhatsApp !
                        </h1>
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
                <section className='flex flex-col gap-8 mb-20 w-11/12 justify-center items-center'>
                    <div className='w-full flex justify-center'>
                        <h2 className='w-4/5 flex justify-center text-xl md:text-2xl 4xl:text-5xl font-bold lg:w-full text-primaryMarron'>
                            Comment ça marche ?
                        </h2>
                    </div>
                    <div
                        className={
                            'hidden lg block lg:grid lg:grid-cols-9 lg:w-full'
                        }
                    >
                        <div className='col-start-2 flex justify-center'>
                            <div
                                className='
                            flex items-center justify-center
                            w-12 h-12 rounded-full
                            border-outline border-2
                            font-bold
                            text-primaryMarron
                            text-3xl
                            bg-foreground
                            '
                            >
                                1
                            </div>
                        </div>
                        <div className='col-start-3 col-span-2'>
                            <div className='hidden lg:flex items-center justify-evenly h-full'>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                            </div>
                        </div>
                        <div className='col-start-5 flex justify-center'>
                            <div
                                className={`flex items-center justify-center
                                        w-12 h-12 rounded-full
                                        border-2 border-outline
                                        font-bold
                                        text-primaryMarron
                                        text-3xl
                                        bg-foreground
                                        `}
                            >
                                2
                            </div>
                        </div>
                        <div className='col-start-6 col-span-2'>
                            <div className='hidden lg:flex items-center justify-evenly h-full'>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                                <div className='w-2 h-2 rounded-full bg-primaryMarron'></div>
                            </div>
                        </div>
                        <div className='col-start-8 flex justify-center'>
                            <div
                                className={`
                                        flex items-center justify-center
                                        w-12 h-12 rounded-full
                                        border-2 border-outline
                                        font-bold
                                        text-primaryMarron
                                        text-3xl
                                        bg-foreground
                                      `}
                            >
                                3
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-9 lg:w-full w-11/12 gap-8 justify-center items-center'>
                        <div className='block lg:hidden flex justify-center'>
                            <div
                                className='
                            flex items-center justify-center
                            w-12 h-12 rounded-full
                            border-2 border-outline
                            font-bold
                            text-primaryMarron
                            text-3xl
                            bg-foreground
                            '
                            >
                                1
                            </div>
                        </div>
                        <div className='lg:col-start-1 lg:col-span-3 bg-foreground border-2 border-outline w-full flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl lg:min-h-60'>
                            <div className='flex flex-col gap-3 items-center'>
                                <div className='flex justify-center text-xl sm:text-2xl font-medium text-primaryMarron'>
                                    Créez votre évenement
                                </div>
                                <p className='text-base text-gray-700 lg:text-lg'>
                                    Créez un évenement pour votre famille ou vos
                                    amis et invitez-les à le rejoindre
                                </p>
                            </div>
                        </div>
                        <div className='block lg:hidden flex justify-center'>
                            <div
                                className='
                            flex items-center justify-center
                            w-12 h-12 rounded-full
                            border-2 border-outline
                            font-bold
                            text-primaryMarron
                            text-3xl
                            bg-foreground
                            '
                            >
                                2
                            </div>
                        </div>
                        <div className='lg:col-start-4 lg:col-span-3 bg-foreground border-2 border-outline w-full flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl lg:min-h-60'>
                            <div className='flex flex-col gap-3 items-center'>
                                <div className='flex justify-center text-xl sm:text-2xl font-medium text-primaryMarron'>
                                    Discutez des cadeaux
                                </div>
                                <p className='text-base text-gray-700 lg:text-lg'>
                                    Chaque membre a son fil de discussion dédié
                                    où les autres peuvent partager leurs idées
                                </p>
                            </div>
                        </div>
                        <div className='block lg:hidden flex justify-center'>
                            <div
                                className='
                            flex items-center justify-center
                            w-12 h-12 rounded-full
                            border-2 border-outline
                            font-bold
                            text-primaryMarron
                            text-3xl
                            bg-foreground
                            '
                            >
                                3
                            </div>
                        </div>
                        <div className='lg:col-start-7 lg:col-span-3 bg-foreground border-2 border-outline w-full flex flex-col gap-10 p-8 sm:rounded-xl shadow-2xl lg:min-h-60'>
                            <div className='flex flex-col gap-3 items-center'>
                                <div className='flex justify-center text-xl sm:text-2xl font-medium text-primaryMarron'>
                                    Gardez la surprise
                                </div>
                                <p className='text-base text-gray-700 lg:text-lg'>
                                    Vous ne pouvez pas voir les discussions
                                    concernant vos propres cadeaux
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='flex flex-col gap-3 mb-12 w-11/12 justify-between items-center bg-foreground border-2 border-outline rounded-2xl p-8'>
                    {(!isConnected ||
                        (isConnected && groups && groups?.length < 1)) && (
                        <>
                            <div className='w-full'>
                                <h2 className='w-4/5 flex justify-center text-xl md:text-2xl 4xl:text-5xl font-bold lg:w-full text-primaryMarron'>
                                    Retrouves tes événements
                                </h2>
                            </div>
                            <div className='flex flex-wrap justify-center lg:justify-evenly gap-10'>
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
                            <div className='w-full flex justify-center'>
                                <h2 className='w-4/5 flex justify-center text-xl md:text-2xl 4xl:text-5xl font-bold lg:w-full text-primaryMarron'>
                                    Mes groupes
                                </h2>
                            </div>
                            <div className='flex flex-wrap justify-center lg:justify-evenly gap-10'>
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
