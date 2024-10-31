import { Button } from '@/components/ui/button'
import { useUserGroupsQuery } from '../../graphql/generated/schema'
import GroupCard from '@/components/GroupCard'
import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Profile() {
    const { data, loading, error } = useUserGroupsQuery({
        fetchPolicy: 'cache-and-network',
    })
    const today = new Date()
    const [allGroups, setAllGroups] = useState(false)

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Erreur : {error.message}</h1>

    function handleAllGroups() {
        setAllGroups(!allGroups)
    }

    return (
        <>
            <Head>
                <title>Mes groupes - Easy Gift</title>
            </Head>

            <section className='w-full mt-5 flex-grow flex flex-col gap-6 pb-6 justify-center items-center text-primaryMarron lg:mt-20'>
                {data?.userGroups?.length === 0 ? (
                    <div className='flex flex-col items-center mt-6'>
                        <p className='text-md mb-3 md:mb-4 lg:mb-6 xl:mb-8 2xl:mb-10 2xl:text-xl'>
                            Crée ton premier groupe et invite tes amis !
                        </p>
                        <Button>
                            <Link href='/creating-groups'>Créer un groupe</Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <section className='flex flex-col gap-6 mb-12 w-11/12 justify-between items-center bg-foreground border-2 border-outline rounded-2xl p-8'>
                            <h1 className='text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold'>
                                Mes événements{' '}
                                {data?.userGroups
                                    ? `(${data.userGroups.length})`
                                    : '(0)'}
                            </h1>
                            <label className='w-full inline-flex items-center justify-end cursor-pointer  lg:col-start-2 lg:col-end-4 xl:col-start-4 xl:col-end-5'>
                                <input
                                    type='checkbox'
                                    onClick={handleAllGroups}
                                    className='sr-only peer'
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primaryMarron"></div>
                                <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                    Tous les groupes
                                </span>
                            </label>
                            <div className='flex flex-wrap justify-center lg:justify-evenly gap-10'>
                                {data?.userGroups &&
                                    data.userGroups.map(group => {
                                        if (!group.event_date) {
                                            return null
                                        }
                                        const eventDate = new Date(
                                            group.event_date
                                        )
                                        if (!allGroups && eventDate < today) {
                                            return null
                                        }
                                        return (
                                            <GroupCard
                                                key={group.id}
                                                group={group}
                                                link={`/group/${group.id}`}
                                            />
                                        )
                                    })}
                            </div>
                            <div className='w-full inline-flex mt-6 items-center justify-end cursor-pointer lg:col-start-2 lg:col-end-4 xl:col-start-4 xl:col-end-5'>
                                <Button>
                                    <a type='button' href='/creating-groups'>
                                        Ajouter un événement
                                    </a>
                                </Button>
                            </div>
                        </section>
                    </>
                )}
            </section>
        </>
    )
}
