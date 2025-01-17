import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useGetDiscussionsByGroupIdWithoutCtxUserQuery } from '@/graphql/generated/schema'
import { checkUserConnected } from '@/utils/checkConnection'

interface Avatar {
    __typename?: 'Avatar'
    id: number
    name: string
    url: string
}

interface User {
    __typename?: 'User'
    id: number
    pseudo: string
    avatar?: Avatar | null
}

interface UserToGroup {
    __typename?: 'UserToGroup'
    user: User
}

export interface Group {
    __typename?: 'Group'
    id: number
    name: string
    event_date?: string | null
    avatar: Avatar
    userToGroups: UserToGroup[]
}
interface GroupComponentProps {
    group: Group
    link: string
}
export default function MyGroup({ group, link }: GroupComponentProps) {
    const [showAll, setShowAll] = useState(false)
    const isConnected = checkUserConnected()

    const handleToggle = () => {
        setShowAll(!showAll)
    }

    const { data, loading, error } =
        useGetDiscussionsByGroupIdWithoutCtxUserQuery({
            variables: { groupId: group.id },
        })

    const displayedUsers = showAll
        ? group.userToGroups
        : group.userToGroups.slice(0, 7)

    const discussionId =
        data?.getDiscussionsByGroupIdWithoutCtxUser.discussions[0]?.id

    return (
        <article className='rounded-xl border bg-background shadow-slate-300 text-primaryMarron hover:scale-105 transition-transform duration-300 ease-in-out sm:max-w-[318px] 2xl:max-w-[343px] 2xl:mx-auto'>
            <div className='flex flex-col p-5 shadow-sm rounded-t-lg gap-3'>
                <img
                    src={group.avatar.url}
                    alt={group.avatar.name}
                    className='w-full h-[180px] object-cover rounded-t-lg'
                />
                <div className='font-bold text-xl'>{group.name}</div>
                {group.event_date && (
                    <div>
                        Date de l'évenement :{' '}
                        {new Date(group.event_date).toLocaleDateString()}
                    </div>
                )}
            </div>
            <div className='flex flex-col justify-evenly p-5 gap-4'>
                <div>Membres du groupe</div>
                <div className={`flex justify-start`}>
                    <div
                        className={`flex ${
                            displayedUsers.length > 7
                                ? 'flex-wrap gap-2'
                                : ' -space-x-3'
                        }`}
                    >
                        {displayedUsers.map(user => (
                            <div
                                className='group cursor-pointer relative'
                                onClick={handleToggle}
                                key={user.user.id}
                            >
                                <img
                                    src={user.user.avatar?.url}
                                    className='w-10 h-10 rounded-full border-solid border-2 border-primaryRed transition ease-in-out hover:-translate-y-1 hover:scale-120 duration-300'
                                    alt={user.user.avatar?.name}
                                    title={user.user.pseudo}
                                />
                                <div className='opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none'>
                                    {user.user.pseudo}
                                    <svg
                                        className='absolute text-black h-2 w-full left-0 top-full'
                                        x='0px'
                                        y='0px'
                                        viewBox='0 0 255 255'
                                    >
                                        <polygon
                                            className='fill-current'
                                            points='0,0 127.5,127.5 255,0'
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                        {!showAll && group.userToGroups.length > 7 && (
                            <a className='flex z-10 items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800'>
                                +{group.userToGroups.length - 7}
                            </a>
                        )}
                    </div>
                </div>

                {isConnected ? (
                    <div className='flex justify-between'>
                        <Button>
                            <Link
                                href={`/group-discussions/${group.id}/discussion/${discussionId}`}
                            >
                                Discussion
                            </Link>
                        </Button>
                        <Button>
                            <Link href={link}>Consulter</Link>
                        </Button>
                    </div>
                ) : (
                    <div className='flex justify-between'>
                        <Button>
                            <Link href={`/auth/login`}>Discussion</Link>
                        </Button>
                        <Button>
                            <Link href={`/auth/login`}>Consulter</Link>
                        </Button>
                    </div>
                )}
            </div>
        </article>
    )
}
