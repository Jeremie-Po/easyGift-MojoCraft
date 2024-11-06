import { useRouter } from 'next/router'
import Accordion from './usersMessageAccordion'
import Head from 'next/head'

const Discussions = ({ switchComponent }: any) => {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Mes discussions - Easy Gift</title>
            </Head>
            <div className='w-full mt-5 flex-grow flex flex-col gap-6 pb-6 justify-center items-center text-primaryMarron lg:mt-20'>
                <section className='flex flex-col gap-6 mb-12 w-11/12 h-screen items-center bg-foreground border-2 border-outline rounded-2xl p-8'>
                    <h1 className='text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold'>
                        Discussion
                    </h1>
                    <Accordion switchComponent={switchComponent}></Accordion>
                </section>
            </div>
        </>
    )
}

export default Discussions
