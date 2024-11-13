import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    useGetMessagesByDisscutionQuery,
    useAddNewMessageSubscription,
    useCreateMessageMutation,
    GetMessagesByDisscutionQuery,
} from '@/graphql/generated/schema'
import Message from './Message'
import { useUserData } from '@/context/userContext'
import { useRouter } from 'next/router'
import { useIntersectionObserver } from '@/hook/useIntersectionObserver'
import { Button } from '../ui/button'

const EspaceDiscussion = ({
    switchComponent,
    showDiscussionReturn,
}: {
    switchComponent: any
    groupId: number
    showDiscussionReturn: boolean
}) => {
    const router = useRouter()
    const { discussionId } = router.query
    const { userData } = useUserData()
    const limit = 15
    const [offset, setOffset] = useState(0)
    const [content, setContent] = useState('')
    const [messages, setMessages] = useState<
        GetMessagesByDisscutionQuery['getMessagesByDisscution']
    >([])
    const [canShowIntersector, setCanShowIntersector] = useState(false)
    const [canGetMore, setCanGetMore] = useState(true)
    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.5,
    })

    const [isGettingMore, setIsGettingMore] = useState(false)

    const selectedDiscussionId = discussionId
        ? parseInt(discussionId as string, 10)
        : null

    const { data, fetchMore, refetch, subscribeToMore } =
        useGetMessagesByDisscutionQuery({
            variables: {
                discussionId: selectedDiscussionId || 0,
                limit,
                offset,
            },
            onCompleted: data => {
                if (data.getMessagesByDisscution.length === 0)
                    return setCanGetMore(false)
                setCanGetMore(true)
            },
            fetchPolicy: 'network-only',
        })

    const { data: subscriptionData } = useAddNewMessageSubscription({
        variables: {
            discussionId: selectedDiscussionId || 0,
        },
    })
    console.log('subscriptiondata', data)
    console.log('discussionId', discussionId)
    console.log('MESSAGES', messages)

    useEffect(() => {
        if (data?.getMessagesByDisscution && !subscriptionData?.newMessage) {
            setMessages(prev => {
                const allMessages = [...data.getMessagesByDisscution, ...prev]
                const mapMessages = new Map()
                for (const message of allMessages) {
                    mapMessages.set(message.id, message)
                }
                return Array.from(mapMessages.values()).sort((a, b) => {
                    return a.created_at > b.created_at ? 1 : -1
                })
            })
        }
        if (
            subscriptionData?.newMessage &&
            subscriptionData.newMessage.user.id !==
                parseInt(userData?.id || '0', 10)
        ) {
            setMessages(prev => [...prev, subscriptionData.newMessage])
        }
    }, [subscriptionData, data])

    const getMore = async () => {
        setOffset(prevOffset => prevOffset + limit)
        setIsGettingMore(true)
        try {
            await fetchMore({
                variables: {
                    discussionId: selectedDiscussionId || 0,
                    limit,
                    offset: offset + limit,
                },
            })

            setTimeout(() => {
                setIsGettingMore(false)
            }, 2000)
        } catch (error) {
            console.error('Error fetching more messages:', error)
        }
    }

    useEffect(() => {
        if (isIntersecting) {
            handleScrollContainer('step')
            getMore()
        }
    }, [isIntersecting])

    const [createMessage] = useCreateMessageMutation()

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await createMessage({
                variables: {
                    discussionId: selectedDiscussionId || 0,
                    userId: parseInt(userData?.id || '0', 10),
                    content,
                },
                onCompleted: data => {
                    setMessages(prev => [...prev, data.createMessage])
                },
            })
            setContent('')
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    const handleScrollContainer = (off: 'all' | 'step') => {
        if (messagesContainerRef.current) {
            //@ts-ignore
            messagesContainerRef.current.scrollTop =
                off === 'all'
                    ? //@ts-ignore
                      messagesContainerRef.current.scrollHeight
                    : //@ts-ignore
                      messagesContainerRef.current.scrollTop + 100
        }
    }

    useEffect(() => {
        if (isGettingMore) return
        setCanShowIntersector(false)
        if (messages.length) {
            setTimeout(() => {
                return setCanShowIntersector(true)
            }, 500)
        }
        handleScrollContainer('all')
    }, [messages, isGettingMore])

    const messagesContainerRef = useRef<React.LegacyRef<HTMLUListElement>>(null)

    useMemo(() => {
        setMessages([])
        setOffset(0)
        refetch()
    }, [refetch, selectedDiscussionId])

    console.log(showDiscussionReturn)
    return (
        <div
            className={
                'w-full my-2 flex flex-col overflow-y-auto gap-2 items-center h-5/6 lg:mt-20'
            }
        >
            {showDiscussionReturn && (
                <Button>
                    <div onClick={switchComponent}>
                        Retour aux choix des discussions
                    </div>
                </Button>
            )}
            <div
                className={`bg-bgNav flex justify-center items-center w-11/12 h-5/6 lg:h-3/4 border border-border rounded-2xl`}
            >
                <div className='flex flex-col rounded-lg w-11/12 h-full py-5'>
                    <ul
                        className='overflow-y-auto h-full'
                        //@ts-ignore
                        ref={messagesContainerRef}
                    >
                        {canShowIntersector && canGetMore ? (
                            <div ref={ref} className='' />
                        ) : (
                            <p className='font-semibold w-full text-center pb-4'>
                                Début de la discussion
                            </p>
                        )}
                        <div className={'flex flex-col gap-5'}>
                            {messages.map(message => (
                                <Message key={message.id} message={message} />
                            ))}
                        </div>
                    </ul>
                </div>
            </div>
            <form
                className='w-11/12 flex justify-between items-center '
                onSubmit={handleSendMessage}
            >
                <input
                    className='border border-border w-5/6 p-2 rounded-2xl'
                    type='text'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <Button
                    disabled={
                        !content.length ||
                        content.split(' ').join('').length === 0
                    }
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
                            d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
                        />
                    </svg>
                </Button>
            </form>
        </div>
    )
}

export default EspaceDiscussion
