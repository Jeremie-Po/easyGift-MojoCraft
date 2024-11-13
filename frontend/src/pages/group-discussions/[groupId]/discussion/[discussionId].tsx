import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import EspaceDiscussion from '@/components/discussions/EspaceDiscussion'
import Discussions from '@/components/discussions/discussions'
import { useMediaQuery } from 'react-responsive'

const DiscussionsPage = () => {
    const router = useRouter()
    const { groupId } = router.query
    const [showMessages, setShowMessages] = useState<boolean>(true)
    const [showDiscussions, setShowDiscussions] = useState<boolean>(true)
    const [showDiscussionReturn, setShowDiscussionReturn] =
        useState<boolean>(false)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(() => {
        if (isTabletOrMobile) {
            setShowDiscussions(true)
            setShowMessages(false)
            setShowDiscussionReturn(true)
        } else {
            setShowDiscussions(true)
            setShowMessages(true)
            setShowDiscussionReturn(false)
        }
    }, [isTabletOrMobile])

    const switchComponent = () => {
        if (isTabletOrMobile) {
            setShowDiscussions(!showDiscussions)
            setShowMessages(!showMessages)
        }
    }
    return (
        <>
            <section className='text-primaryMarron w-full h-screen flex flex-col md:flex-grow md:flex md:flex-row '>
                {showDiscussions && (
                    <Discussions switchComponent={switchComponent} />
                )}
                {showMessages && (
                    <EspaceDiscussion
                        groupId={Number(groupId)}
                        switchComponent={switchComponent}
                        showDiscussionReturn={showDiscussionReturn}
                    />
                )}
                {/*<EspaceDiscussion*/}
                {/*    groupId={Number(groupId)}*/}
                {/*    switchComponent={switchComponent}*/}
                {/*/>*/}
            </section>
        </>
    )
}

export default DiscussionsPage
