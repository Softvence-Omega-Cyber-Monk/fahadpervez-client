export default function ProfilePicture() {
  return (
    <div className="w-full bg-white  sm:p-6 lg:p-8 rounded-lg">
      <div>
        {/* Header with Edit Link */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-lg font-sm text-gray-900">
            Profile picture
          </h2>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-normal text-md sm:text-lg underline"
          >
            Edit
          </a>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces"
              alt="John Doe"
              className="w-16 h-16 sm:w-28 sm:h-28 rounded-full object-cover bg-gray-100"
            />
          </div>

          {/* User Info */}
          <div>
            <h3 className="text-lg sm:text-lg font-sm text-gray-900 mb-1">
              John Doe
            </h3>
            <p className="text-base sm:text-md text-gray-600 font-normal">
              Buyer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}