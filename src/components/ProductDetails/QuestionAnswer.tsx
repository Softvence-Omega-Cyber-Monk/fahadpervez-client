
const QuestionAnswer = () => {
    return (
        <div className="">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Questions and answers
                </h1>
                <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium whitespace-nowrap self-start sm:self-auto">
                    Ask Question
                </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search ..."
                        className="w-full px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between sm:justify-center gap-2 min-w-[140px]">
                    <span>Short By</span>
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Question Card 1 */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <h2 className="text-base md:text-lg font-medium text-gray-900">
                        What are the potential side effects of this medicin?
                    </h2>
                    <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap self-start sm:self-auto">
                        Answer
                    </button>
                </div>

                {/* Answer 1 */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg
                                className="w-4 h-4 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Esther Howard</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                        Lorem ipsum dolor sit amet consectetur. Quisque facilisis blandit cras neque turpis dui. Varius convallis nec in habitasse lacus ullamcorper ornare volutpat.
                    </p>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                />
                            </svg>
                            <span className="text-sm font-medium">05</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                            <span className="text-sm font-medium">00</span>
                        </button>
                    </div>
                </div>

                {/* Answer 2 */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg
                                className="w-4 h-4 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Esther Howard</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                        Lorem ipsum dolor sit amet consectetur. Quisque facilisis blandit cras neque turpis dui. Varius convallis nec in habitasse lacus ullamcorper ornare volutpat.
                    </p>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                />
                            </svg>
                            <span className="text-sm font-medium">05</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                            <span className="text-sm font-medium">00</span>
                        </button>
                    </div>
                </div>

                {/* See More Answers Link */}
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center gap-1">
                    See More Answers
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

            {/* See All Questions Link */}
            <div className="text-center">
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                    See All (10) Questions
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default QuestionAnswer