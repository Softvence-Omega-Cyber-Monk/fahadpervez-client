import { FormEvent, useState } from 'react';

export default function HelpSupport() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    console.log('Form submitted with data:', formData);
    
  };

  return (
    <div>
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-5">
        Help & Support
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full bg-white p-2 sm:p-6 lg:p-8 rounded-lg"
      >
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-normal text-gray-900 mb-8">
          Contact & Support
        </h2>

        <div className="space-y-6">
          {/* First Name / Last Name */}
          <div className="grid gap-6">
            <div>
              <label className="block text-sm sm:text-base text-gray-900 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full px-4 py-3 bg-blue-50 text-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact / Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm sm:text-base text-gray-900 mb-2">
                Contact Number
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

          {/* Message */}
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

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-12 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-medium rounded-lg transition-colors"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
