import React from 'react';

interface SaveButtonProps {
  type: 'primary' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
}

interface SectionTitleProps {
  children: React.ReactNode;
}

const SaveButton = ({ type, children, onClick }: SaveButtonProps) => (
  <button
    onClick={onClick}
    className={`
      mt-6 px-6 py-2.5 rounded-lg font-medium text-white text-sm transition-all
      ${type === 'primary' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}
    `}
  >
    {children}
  </button>
);

const SectionTitle = ({ children }: SectionTitleProps) => (
  <h3 className="text-base font-semibold text-gray-900 mb-4 mt-8 first:mt-0">{children}</h3>
);

const StorePreference = () => {
  return (
    <div className="space-y-6">
      <SectionTitle>Upload your store banner</SectionTitle>
      <div className="text-center border-2 border-dashed border-gray-300 p-12 rounded-lg bg-gray-50">
        <div className="text-5xl text-gray-400 mb-3">☁️</div>
        <p className="text-sm text-gray-600">
          <button className="text-blue-600 hover:text-blue-700 font-medium">Upload an image</button> or drag and drop PNG, JPG, up to 10 mb (1600 x 1200) recommended
        </p>
      </div>

      <SectionTitle>Currency and shipping information</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Currency</label>
          <select defaultValue="USD" className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900">
            <option>USD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Shipping Regions</label>
          <select defaultValue="United states" className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900">
            <option>United states</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Shipping Location</label>
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <label className="flex items-center text-sm text-gray-800">
              <input
                type="radio"
                name="location"
                defaultChecked
                className="appearance-none h-4 w-4 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:ring-4 checked:ring-blue-200 mr-3 cursor-pointer transition-all duration-200"
              />
              Local within city/state
            </label>

            <label className="flex items-center text-sm text-gray-800">
              <input
                type="radio"
                name="location"
                className="appearance-none h-4 w-4 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:ring-4 checked:ring-blue-200 mr-3 cursor-pointer transition-all duration-200"
              />
              National within country
            </label>

            <label className="flex items-center text-sm text-gray-800">
              <input
                type="radio"
                name="location"
                className="appearance-none h-4 w-4 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:ring-4 checked:ring-blue-200 mr-3 cursor-pointer transition-all duration-200"
              />
              International
            </label>
          </div>

        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Holding time (days)</label>
          <input
            type="number"
            defaultValue="3"
            className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">Store description</label>
        <textarea
          rows={4}
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          className="w-full p-3 bg-blue-50 border-0 rounded-lg text-gray-900 resize-y"
        />
      </div>

      <SectionTitle>Product Categories</SectionTitle>
      <div className="flex flex-wrap gap-3">
        {['Analgesic', 'Antibiotics', 'Cardiovascular medications', 'Antidiabetic Medications', 'Central nervous system', 'All'].map(cat => (
          <label key={cat} className="flex items-center text-sm text-gray-800 bg-blue-50 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-100 transition-colors">
            <input type="checkbox" defaultChecked={cat === 'Analgesic'} className="custom-checkbox mr-2" />
            {cat}
          </label>
        ))}
      </div>
      <SaveButton type="primary">Save changes</SaveButton>
    </div>
  );
};

export default StorePreference;
