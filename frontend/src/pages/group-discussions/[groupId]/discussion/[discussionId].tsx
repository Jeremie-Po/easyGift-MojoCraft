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
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(() => {
        if (isTabletOrMobile) {
            setShowDiscussions(true)
            setShowMessages(false)
        } else {
            setShowDiscussions(true)
            setShowMessages(true)
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
            <div className='absolute left-0 top-0 w-1 h-full z-10'></div>
            <section className='text-primaryMarron w-full max-h-[93vh] h-screen flex flex-col overflow-y-auto md:flex-grow md:flex md:flex-row'>
                {showDiscussions && (
                    <Discussions switchComponent={switchComponent} />
                )}
                {showMessages && (
                    <EspaceDiscussion
                        groupId={Number(groupId)}
                        switchComponent={switchComponent}
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
