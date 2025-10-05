import { useState } from 'react';

const HelpAndSupport = () => {
    // State to manage which FAQ item is currently open (stores the index)
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqItems = [
        { 
            question: "What areas do you serve?", 
            answer: "We currently serve all major cities in the US, Canada, and select European markets. Please contact live chat for specific region inquiries." 
        },
        { 
            question: "Product quality ?", 
            answer: "All our products undergo a rigorous triple-check quality assurance process before shipping to ensure the highest standards." 
        },
        { 
            question: "Why with me ?", 
            answer: "Choosing us means unparalleled customer service, best-in-class product quality, and the fastest delivery times in the industry." 
        },
        { 
            question: "How to order create ?", 
            answer: "You can create an order by adding items to your cart, proceeding to checkout, and filling out your shipping and payment details." 
        },
        { 
            question: "Delivery time or charge ?", 
            answer: "Standard delivery is 3-5 business days with a fixed charge of $5. Express 1-day delivery is available for $15." 
        }
    ];

    const supportOptions = [
        {
            title: "Live Chat",
            icon: (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" />
                </svg>
            ),
            description: "A24/7 Support: Immediate help whenever you need it",
            details: null,
        },
        {
            title: "Email Support",
            icon: (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            description: "Get a response within 24 hours for detailed request.",
            details: null,
        },
        {
            title: "Phone Support",
            icon: (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            description: "Available 9am - 6pm (Mon to Fri)+123 456 789",
            details: null,
        },
    ];

    // Toggle function for the accordion
    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Chevron Icon Component
    const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
        <svg 
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'rotate-0'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            {/* Header and Search */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Support</h1>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search users..." 
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {/* Search Icon */}
                        <svg className="absolute right-3 top-3 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-4 mt-6">
                    <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-md">
                        Add FAQ
                    </button>
                </div>

                {/* FAQ Accordion List */}
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                    {faqItems.map((item, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleFaq(index)} // <-- Click handler added here
                                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors duration-150"
                            >
                                <span className="text-base font-medium text-gray-800">{item.question}</span>
                                <ChevronIcon isOpen={openIndex === index} />
                            </button>
                            
                            {/* Answer Content - Conditionally rendered */}
                            {openIndex === index && (
                                <div className="p-4 pt-0 text-gray-600 bg-gray-50/50">
                                    <p>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Support Options Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {supportOptions.map((option, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
                        {/* Icon Container */}
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-blue-100 rounded-full">
                                {option.icon}
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            {option.description}
                        </p>
                        {option.details && <p className="text-sm mb-4">{option.details}</p>}

                        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                            Save Changes
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpAndSupport;