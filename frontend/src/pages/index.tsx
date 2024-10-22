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
    const [isConnected, setIsConnected] = useState(checkUserConnected())
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

    useEffect(() => {
        const handleUserChange = () => {
            const connected = checkUserConnected()
            setIsConnected(connected)
            if (!connected) {
                setGroups([])
            }
        }

        window.addEventListener('userChange', handleUserChange)

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('userChange', handleUserChange)
        }
    }, [])

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
        <>
            <Head>
                <title>Page d'accueil - Easy Gift</title>
            </Head>
            {/*<section*/}
            {/*    ref={container}*/}
            {/*    className='my-10 min-h-40 h-auto flex flex-initial flex-wrap content-start items-center mx-auto w-4/5 md:my-28 md:min-h-80 md:justify-evenly md:max-w-2xl lg:flex-nowrap lg:my-44 lg:max-w-7xl xl:my-20 xl:min-h-120  2xl:max-w-[1800px] 2xl:h-[85vh] 2xl:content-center 2xl:my-0'*/}
            {/*>*/}
            {/*    <div className='hidden relative w-full order-2 md:block md:max-w-4xl md:min-w-96 lg:mb-24 lg:order-1 lg:max-w-xl:min-h-130 lg:max-w-lg 2xl:max-w-4xl'>*/}
            {/*        <Image*/}
            {/*            src='/images/img-pages/hero-img.png'*/}
            {/*            alt="Photo d'une femme recevant un cadeaux"*/}
            {/*            width={963}*/}
            {/*            height={712}*/}
            {/*            priority={true}*/}
            {/*            style={{ objectFit: 'cover' }}*/}
            {/*            className={'image1'}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className='h-auto mb-9 sm:max-w-2xl md:w-2/2 md:max-w-3xl lg:mb-0 lg:max-w-lg 2xl:max-w-2xl'>*/}
            {/*        <h1 className='text1 mb-10 text-4xl md:text-5xl md:mb-14 2xl::text-6xl font-bold text-primaryBlue'>*/}
            {/*            Easy Gift*/}
            {/*        </h1>*/}
            {/*        <p*/}
            {/*            data-splitting*/}
            {/*            className='paragraphe1 mb-9 text-lg text-left md:mb-10 md:text-xl 2xl:text-2xl'*/}
            {/*        >*/}
            {/*            Prêt à en finir avec les cadeaux ratés ?*/}
            {/*            <br />*/}
            {/*            <b>Organisez et échangez</b> avec vos ami(e)s pour*/}
            {/*            trouver "LA" perle rare sans stress.*/}
            {/*            <br />*/}
            {/*            C'est amusant, c'est simple... et c'est un cadeau !*/}
            {/*        </p>*/}
            {/*        <Button className='text-base h-9 rounded-md px-3 shadow-lg shadow-slate-400 md:h-11 md:text-lg md:px-8 2xl:h-14 2xl:px-10 2xl:text-2xl'>*/}
            {/*            {isConnected ? (*/}
            {/*                <Link href='/creating-groups'>*/}
            {/*                    Je créé un groupe*/}
            {/*                </Link>*/}
            {/*            ) : (*/}
            {/*                <Link href='/auth/login'>Je me lance</Link>*/}
            {/*            )}*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</section>*/}
            <section
                ref={container}
                className='flex flex-col lg:flex-row justify-center items-center h-screen'
            >
                <div className='flex justify-center items-center w-4/5 gap-3'>
                    <div className='flex flex-col w-11/12 lg:w-4/5 gap-5 lg:gap-6'>
                        <h1 className='text1 text-3xl font-bold text-primaryBlue lg:text-4xl'>
                            Easy Gift
                        </h1>
                        <div className='paragraphe1 max-w-3xl mx-auto flex flex-col gap-4'>
                            <p className='text-lg text-gray-700 font-medium lg:text:xl'>
                                Fini les cadeaux en double et les discussions
                                secrètes sur WhatsApp !
                            </p>
                            <p className='text-base text-gray-700 lg:text-lg'>
                                Easy Gift est votre espace privé pour coordonner
                                les cadeaux de Noël en famille ou entre amis.
                                Chaque membre dispose de son propre fil de
                                discussion, invisible pour lui mais accessible
                                aux autres, permettant d'organiser sereinement
                                les cadeaux tout en préservant l'effet de
                                surprise.
                            </p>
                            <p className='text-base text-gray-700 lg:text-lg'>
                                Discutez des idées, coordonnez les achats
                                groupés, et assurez-vous que chacun reçoive des
                                cadeaux qui lui feront vraiment plaisir - le
                                tout dans un seul espace organisé et
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
                </div>
                <div className='hidden w-4/5 max-w-3xl mx-auto lg:block'>
                    <Image
                        src='/images/img-pages/hero-img.png'
                        alt="Photo d'une femme recevant un cadeaux"
                        width={963}
                        height={712}
                        priority={true}
                        style={{ objectFit: 'cover' }}
                        className={'image1'}
                    />
                </div>
            </section>
            <section className='w-full mb-28 mx-auto min-h-175 h-full bg-indigo-50 flex flex-col justify-center items-center sm:min-h-160 md:min-h-170  md:mb-14 lg:pt-20 lg:pb-16 lg:flex-wrap lg:flex-row lg:content-center lg:justify-around lg:min-h-140 2xl:pt-0 xl:pb-0 2xl:items-start 2xl:justify-center 2xl:content-end 2xl:flex-row'>
                <h2 className='w-4/5 text-xl mb-8  sm:text-center md:text-4xl 4xl:text-5xl font-bold  lg:mb-14 lg:w-full 2xl:mb-8 2xl:mt-32 text-primaryRed'>
                    Crée ton groupe
                </h2>
                <article className='w-4/5 sm:max-w-xl 2xl:ml-36 4xl:ml-52 lg:order-3'>
                    <p className='mb-8 text-lg md:mb-10 md:text-xl  2xl:text-2xl 2xl:pt-12'>
                        Fini les "oups,... tu n'as rien entendu !"
                        <br />
                        Parce que chez Easy Gift, nous aimons les surprises,
                        nous avons créé pour vous le premier espace entièrement
                        confidentiel. Ce qui est dit dans une discussion Easy
                        Gift reste sur Easy Gift...
                        <br />
                        L'aventure commence ici :
                        <b> Créé un groupe thématique</b> pour chaque occasion.
                        <br />
                        Fête de fin d'année, anniversaire, baby shower... et{' '}
                        <b>
                            retrouve instantanément toutes les discussions
                            secrètes pour chaque membre
                        </b>
                        .
                    </p>
                    <Button
                        onClick={handleButtonClick}
                        className='text-base h-9 mb-28 rounded-md px-3 shadow-lg shadow-slate-400 md:h-11 md:text-lg md:px-8 lg:mb-8 2xl:h-14 2xl:px-10 2xl:text-2xl'
                    >
                        {isConnected ? (
                            <Link href='/creating-groups'>C'est parti !</Link>
                        ) : (
                            <Link href='/auth/login'>Ca m'intéresse</Link>
                        )}
                    </Button>
                </article>
                <Carousel className='max-w-96 max-h-140 sm:max-w-xl lg:mb-28 lg:ml-16 lg:mr-16 2xl:h-[576px] lg:order-2'>
                    <CarouselPrevious className='top-[-25px] left-8 md:top-2/4'>
                        Précédent
                    </CarouselPrevious>
                    <CarouselContent className='max-w-[600px] lg:max-w-[500px] max-h-[700px]'>
                        <CarouselItem className='max-w-[700px] max-h-[500px]'>
                            <img
                                src='/images/img-pages/chat-mobile-mockup.png'
                                alt='Exemple de discussion sur un telephone portable'
                                className='object-contain w-full h-full'
                            />
                        </CarouselItem>
                        <CarouselItem className='max-w-[700px] max-h-[500px]'>
                            <img
                                src='/images/img-pages/messenger.png'
                                alt="Exemple de discussion sur un écran d'ordinateur"
                                className='object-contain w-full h-full'
                            />
                        </CarouselItem>
                        <CarouselItem className='max-w-[700px] max-h-[500px]'>
                            <img
                                src='/images/img-pages/man-with-a-gift.webp'
                                alt='Homme souriant tenant un cadeau dans les mains'
                                className='object-contain w-full h-full'
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselNext className='top-[-25px] right-8 md:top-2/4'>
                        Suivant
                    </CarouselNext>
                </Carousel>
            </section>
            <section className='w-full h-full flex-grow flex flex-col  gap-6 pb-6 my-10 justify-center items-center md:my-12 2xl:my-28'>
                {(!isConnected ||
                    (isConnected && groups && groups?.length < 1)) && (
                    <div className='flex flex-wrap gap-6 justify-center max-w-80 lg:justify-evenly w-10/12 md:max-w-2xl lg:w-full lg:max-w-full'>
                        <h2 className='w-full flex-grow text-3xl mb-6 text-primaryRed sm:text-center md:mb-10 md:text-4xl 4xl:text-5xl font-bold  2xl:mt-0'>
                            Retrouve tes groupes
                        </h2>
                        <p className='mb-8 text-lg basis-full text-center md:mb-10 md:text-xl  2xl:text-2xl lg:mb-14 '>
                            Une fois que tu auras créé ou rejoint un groupe,
                            retrouve-le ici !
                        </p>
                        <div className='flex flex-wrap gap-6 justify-center max-w-80 lg:justify-center w-10/12 md:max-w-none md:min-w-[680px]  md:w-4/5 lg:w-full lg:max-w-[1000px]'>
                            <GroupCard key='1' group={group1} link={link1} />
                            <GroupCard key='2' group={group2} link={link2} />
                            <GroupCard key='3' group={group3} link={link3} />
                        </div>
                    </div>
                )}

                {isConnected && groups && groups.length > 0 && (
                    <div className='flex flex-wrap gap-6 justify-center max-w-80 lg:justify-evenly w-10/12 md:max-w-2xl lg:max-w-4xl lg:grid lg:grid-cols-3 lg:gap-y-8 lg:gap xl:max-w-[1200px] xl:grid-cols-4 2xl:gap-y-10'>
                        <h2 className='w-full h-full text-3xl mb-8 text-primaryRed sm:text-center md:mb-10 md:text-4xl lg:col-start-1 lg:col-end-4 xl:col-start-1 xl:col-end-5 font-bold 4xl:text-5xl 2xl:mt-0 2xl:mb-12 align-middle'>
                            Mes groupes
                        </h2>

                        {groups.map(group => (
                            <GroupCard
                                key={group.id}
                                group={group}
                                link={`/group/${group.id}`}
                            />
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}
