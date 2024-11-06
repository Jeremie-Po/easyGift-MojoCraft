import { useEffect, useState } from 'react'
import { useUserGroupsQuery } from '@/graphql/generated/schema'
import Link from 'next/link'
import { Group } from '@/components/GroupCard'
import { useRouter } from 'next/router'

export default function Accordion({ switchComponent }: any) {
    const router = useRouter()
    const { groupId, discussionId } = router.query

    const eventId = typeof groupId === 'string' ? parseInt(groupId, 10) : null

    const chatId =
        typeof discussionId === 'string' ? parseInt(discussionId, 10) : null

    const [activeIndex, setActiveIndex] = useState<number | null>(
        eventId ?? null
    )

    useEffect(() => {
        if (eventId !== null) {
            setActiveIndex(eventId)
        }
    }, [eventId])

    const { data, error } = useUserGroupsQuery({
        fetchPolicy: 'cache-and-network',
    })
    console.log('ici', eventId)
    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }
    const accordions = data?.userGroups.map(accordion => ({
        id: accordion.id,
        name: accordion.name,
        avatar: accordion.avatar,
        eventDate: accordion.event_date,
        discussions: accordion.discussions.map(discussion => ({
            id: discussion.id,
            users: discussion.users,
            discussionName: discussion.userDiscussion.pseudo,
        })),
        discussionParticipants: accordion.userToGroups.map(participant => ({
            id: participant.id,
            pseudo: participant.user.pseudo,
            avatar: participant.user.avatar,
        })),
    }))

    console.log('accordion', accordions)
    return (
        <div className='w-full max-w-md mx-auto space-y-2'>
            {accordions?.map(event => (
                <div
                    key={event.id}
                    className='border border-border rounded-lg bg-background'
                >
                    <button
                        className='w-full px-4 py-3 text-left bg-background hover:bg-border flex justify-between items-center'
                        onClick={() => toggleAccordion(event.id)}
                    >
                        <span className='font-medium'>
                            {event.id} {event.name}
                        </span>
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${
                                activeIndex === event.id ? 'rotate-180' : ''
                            }`}
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 9l-7 7-7-7'
                            />
                        </svg>
                    </button>
                    <div
                        className={`overflow-y-auto transition-all duration-200 ${
                            activeIndex === event.id
                                ? 'max-h-40 opacity-100'
                                : 'max-h-0 opacity-0'
                        }`}
                    >
                        {event.discussions.map(item => (
                            <div key={item.id}>
                                <Link
                                    href={`/group-discussions/${event.id}/discussion/${item.id}`}
                                    className={`flex w-full justify-between items-center hover:bg-border ${chatId === item.id ? 'bg-border' : ''}`}
                                    onClick={switchComponent}
                                >
                                    <div className='p-4'>
                                        {item.id} Discussion pour{' '}
                                        {item.discussionName}
                                    </div>
                                    <div className='p-4'>
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
                                                d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                                            />
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
