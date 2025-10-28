// QuestionAnswer.tsx
import { useState } from "react";
import { Search, ThumbsUp, MessageCircle, ChevronRight } from "lucide-react";

interface QuestionAnswerProps {
  productId: string;
}

const QuestionAnswer = ({ productId }: QuestionAnswerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAnswerModal, setShowAnswerModal] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");

  // Mock Q&A data - Replace with API integration when available
  const questions = [
    {
      id: "1",
      question: "What are the potential side effects of this medicine?",
      answers: [
        {
          id: "a1",
          user: "Dr. Sarah Johnson",
          text: "Common side effects may include mild digestive discomfort. This supplement is generally well-tolerated. Always consult with your healthcare provider before starting any new supplement.",
          likes: 12,
          replies: 2,
          date: "2024-10-20",
        },
        {
          id: "a2",
          user: "Mike Thompson",
          text: "I've been taking this for 3 months and haven't experienced any side effects. It's been great for my sleep quality.",
          likes: 8,
          replies: 0,
          date: "2024-10-18",
        },
      ],
    },
    {
      id: "2",
      question: "How long does it take to see results?",
      answers: [
        {
          id: "a3",
          user: "Emily Roberts",
          text: "Most people notice improvements in sleep quality within 1-2 weeks of consistent use. For muscle relaxation benefits, it may take 3-4 weeks.",
          likes: 15,
          replies: 1,
          date: "2024-10-15",
        },
      ],
    },
    {
      id: "3",
      question: "Can I take this with other supplements?",
      answers: [
        {
          id: "a4",
          user: "Pharmacist John",
          text: "Generally yes, but it's always best to consult with your healthcare provider, especially if you're taking medications or have existing health conditions.",
          likes: 10,
          replies: 0,
          date: "2024-10-12",
        },
      ],
    },
  ];

  const handleSubmitAnswer = (questionId: string) => {
    if (!answerText.trim()) {
      alert("Please enter an answer");
      return;
    }
    // API call would go here
    console.log("Submitting answer for question:", questionId, answerText);
    setAnswerText("");
    setShowAnswerModal(null);
  };

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between sm:justify-center gap-2 min-w-[140px]">
          <span>Sort By</span>
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

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No questions found. Be the first to ask!</p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <h2 className="text-base md:text-lg font-medium text-gray-900">
                  {question.question}
                </h2>
                <button
                  onClick={() => setShowAnswerModal(question.id)}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap self-start sm:self-auto"
                >
                  Answer
                </button>
              </div>

              {/* Answers */}
              <div className="space-y-4">
                {question.answers.slice(0, 2).map((answer) => (
                  <div
                    key={answer.id}
                    className="pb-4 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-blue-600"
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
                      <div>
                        <span className="text-sm font-medium text-gray-900">
                          {answer.user}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {new Date(answer.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3 ml-10">
                      {answer.text}
                    </p>
                    <div className="flex items-center gap-4 ml-10">
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="w-5 h-5" />
                        <span className="text-sm font-medium">{answer.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{answer.replies}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* See More Answers Link */}
              {question.answers.length > 2 && (
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center gap-1 mt-4">
                  See {question.answers.length - 2} More Answers
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* See All Questions Link */}
      {questions.length > 3 && (
        <div className="text-center mt-6">
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors inline-flex items-center gap-1">
            See All ({questions.length}) Questions
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Answer Modal */}
      {showAnswerModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] sm:w-[500px]">
            <h3 className="text-lg font-semibold mb-4">Write Your Answer</h3>

            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Share your knowledge or experience..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              rows={5}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAnswerModal(null);
                  setAnswerText("");
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitAnswer(showAnswerModal)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswer;