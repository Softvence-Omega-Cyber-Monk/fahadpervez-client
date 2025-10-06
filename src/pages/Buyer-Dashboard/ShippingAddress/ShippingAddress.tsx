import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function ShippingAddress() {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [addresses, setAddresses] = useState([
    {
      id: 0,
      name: 'Liam Thompson',
      tag: 'Home',
      address: '1131 Dusty Townline, Jacksonville, TX 40322',
      contact: '(936) 361-0310'
    },
    {
      id: 1,
      name: 'Blue Horizon Innovations',
      tag: 'Office',
      address: '1131 Dusty Townline, Jacksonville, TX 40322',
      contact: '(936) 361-0310'
    }
  ]);

  const handleRemove = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    if (selectedAddress === id && addresses.length > 1) {
      setSelectedAddress(addresses[0].id === id ? addresses[1].id : addresses[0].id);
    }
  };

  return (
    <div className="w-full  ">
      <div className="max-w-4xl bg-white rounded-lg p-4">
        {/* Address Items */}
        <div className="space-y-0">
          {addresses.map((address, index) => (
            <div key={address.id}>
              <div className="flex items-start gap-3 sm:gap-4 py-6">
                {/* Radio Button */}
                <button
                  onClick={() => setSelectedAddress(address.id)}
                  className="flex-shrink-0 mt-1"
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAddress === address.id
                      ? 'border-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedAddress === address.id && (
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-600" />
                    )}
                  </div>
                </button>

                {/* Address Details */}
                <div className="flex-1 min-w-0">
                  {/* Name and Tag */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3 className="text-lg sm:text-xl text-gray-900">
                      {address.name}
                    </h3>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-md border border-blue-600 font-medium">
                      {address.tag}
                    </span>
                  </div>

                  {/* Address */}
                  <p className="text-sm sm:text-base text-gray-700 mb-2">
                    {address.address}
                  </p>

                  {/* Contact */}
                  <p className="text-sm sm:text-base text-gray-900">
                    <span className="">Contact - </span>
                    {address.contact}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <button className="text-gray-700 hover:text-gray-900 text-sm sm:text-base font-normal border-r border-gray-200 pr-5">
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemove(address.id)}
                    className="text-red-600 hover:text-red-700 text-sm sm:text-base font-normal"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Divider */}
              {index < addresses.length - 1 && (
                <div className="border-t border-gray-200" />
              )}
            </div>
          ))}
        </div>

        {/* Add New Button */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-base sm:text-lg font-medium ml-auto">
            Add New
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}