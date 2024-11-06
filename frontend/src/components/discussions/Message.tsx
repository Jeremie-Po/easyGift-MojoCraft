import { useUserData } from '@/context/userContext'
import {
    GetMessagesByDisscutionQuery,
    useGetGroupByIdQuery,
    useGetMessagesByDisscutionQuery,
    useUserGroupsQuery,
} from '@/graphql/generated/schema'
import Image from 'next/image'
import React from 'react'
import { formatTimestamp } from '@/utils/date'
import { useRouter } from 'next/router'

function Message({
    message,
}: {
    message: GetMessagesByDisscutionQuery['getMessagesByDisscution'][0]
}) {
    const { userData } = useUserData()
    const messageDate = formatTimestamp(
        message.created_at,
        'DD/MM/YYYY HH:mm:ss'
    )
    const router = useRouter()
    const { groupId, discussionId } = router.query

    const userAvatar = message.user.avatar?.url || ''
    const currentUserId = userData?.id || ''
    return message.user.id === parseInt(currentUserId, 10) ? (
        <div className={`w-full flex justify-end`}>
            <div className='w-3/4 max-w-80 p-3 rounded-md bg-background border border-border flex flex-col gap-1'>
                <p className='flex justify-end text-sm font-semibold text-red-600'>
                    Moi
                </p>
                <div className='text-sm font-semibold'>
                    <p>{message.content}</p>
                </div>
                <div className='flex justify-end text-xs'>
                    <p>{messageDate}</p>
                </div>
            </div>
        </div>
    ) : (
        <div className={`w-full flex justify-start`}>
            <div className='flex items-start translate-x-2 -translate-y-4'>
                <Image
                    alt={`${message.user.pseudo} avatar`}
                    src={userAvatar}
                    width={10}
                    height={10}
                    className='w-10 h-10 rounded-full border-solid border-2 border-border'
                />
            </div>
            <div className='w-3/4 max-w-80 p-3 rounded-md bg-foreground border border-border flex flex-col gap-1'>
                <p className='flex justify-start text-sm font-semibold text-blue-600'>
                    {message.user.pseudo}
                </p>
                <div className='text-sm font-semibold flex justify-end'>
                    <p>{message.content}</p>
                </div>
                <div className='flex justify-start text-xs'>
                    <p>{messageDate}</p>
                </div>
            </div>
        </div>
    )
}

export default Message
