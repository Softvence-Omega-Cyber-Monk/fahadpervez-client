

const HelpCard = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need help?</h2>

      {/* Button */}
      <button className="w-full bg-[#007AFF] hover:bg-[#0066d6] text-white text-lg font-medium py-3 rounded-md transition duration-200">
        Send message
      </button>
    </div>
  );
};

export default HelpCard;
