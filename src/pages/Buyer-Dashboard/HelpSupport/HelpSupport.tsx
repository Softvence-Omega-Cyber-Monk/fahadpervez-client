import { useState } from 'react';

export default function HelpSupport() {
  const [formData, setFormData] = useState({
    firstName: 'Gladys',
    lastName: 'Richards',
    contact: 'Gladys',
    email: 'Richards',
    message: 'Need some help'
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Sending message...', formData);
  };

  return (
 <div>
 <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-5">
  Help & support
</h2>

     <div className="w-full bg-white p-2 sm:p-6 lg:p-8 rounded-lg">
      <div>
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-normal text-gray-900 mb-8">
          Contact & Support
        </h2>

        {/* Form */}
        <div className="space-y-6">
          {/* First Name and Last Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm sm:text-base text-gray-900 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-900 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact Number and Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm sm:text-base text-gray-900 mb-2">
                Contact number
              </label>
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
                className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-sm sm:text-base text-gray-900 mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={6}
              className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
     <div className="flex justify-center mt-5">
            <button
              onClick={handleSubmit}
              className="px-12 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-medium rounded-lg transition-colors"
            >
              Send message
            </button>
          </div>
 </div>
  );
}