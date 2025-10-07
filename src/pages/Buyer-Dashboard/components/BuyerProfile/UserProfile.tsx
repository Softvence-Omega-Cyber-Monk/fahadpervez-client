
import { Mail, Phone, MapPin } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="w-full bg-white p-4 sm:p-6 lg:p-8 rounded-lg">
      <div>
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-gray-200 mb-8">
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces"
              alt="Jane Cooper"
              className="w-24 h-24 rounded-full object-cover"
            />
            
            {/* Name and Join Date */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-1">
                Jane Cooper
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Join date: May, 2019
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span className="text-sm sm:text-base">
              Sunnyvale, California, USA
            </span>
          </div>
        </div>

        {/* Contact Information Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-6">
            Contact Information
          </h2>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Email */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-gray-900" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Email
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 ml-7">
                pangeti@gmail.com
              </p>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-gray-900" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Phone
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 ml-7">
                +00 123 456 789
              </p>
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-gray-900" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Address
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 ml-7">
                Sunnyvale, California, USA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}