import { useState } from 'react'

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const accordionData = [
        {
            title: 'Section 1',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            title: 'Section 2',
            content:
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            title: 'Section 3',
            content:
                'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
    ]

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <div className='w-full max-w-md mx-auto space-y-2'>
            {accordionData.map((item, index) => (
                <div key={index} className='border rounded-lg overflow-hidden'>
                    <button
                        className='w-full px-4 py-3 text-left bg-white hover:bg-gray-50 flex justify-between items-center'
                        onClick={() => toggleAccordion(index)}
                    >
                        <span className='font-medium'>{item.title}</span>
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${
                                activeIndex === index ? 'rotate-180' : ''
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
                        className={`overflow-hidden transition-all duration-200 ${
                            activeIndex === index
                                ? 'max-h-40 opacity-100'
                                : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className='p-4 bg-white'>{item.content}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Accordion
