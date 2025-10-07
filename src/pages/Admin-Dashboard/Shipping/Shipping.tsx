import React, { useState, useCallback } from 'react';
import { Plus, Calendar } from 'lucide-react';

// --- TYPE DEFINITIONS & MOCK DATA ---

interface CarrierMethod {
  id: string;
  logo: string; // Placeholder for logo text/emoji
  name: string;
  price: number;
  maxWeight: string; // e.g., "150bs (168kg)"
  details: string; // e.g., "Full tracking"
  noPoBox: boolean;
}

const mockCarriers: CarrierMethod[] = [
  { id: '1', logo: 'DHL', name: 'DHL Express', price: 1.99, maxWeight: '150bs (168kg)', details: 'Full tracking', noPoBox: false },
  { id: '2', logo: 'Aramex', name: 'Aramex Delivery', price: 2.99, maxWeight: '120bs (115kg)', details: 'Full tracking', noPoBox: false },
  { id: '3', logo: 'Elite', name: 'Elite Shipping', price: 1.26, maxWeight: '150bs (68kg)', details: 'Full tracking', noPoBox: false },
  { id: '4', logo: 'Orrem', name: 'Orrem shipment', price: 1.33, maxWeight: '102bs (108kg)', details: 'Full tracking', noPoBox: false },
];

const cardData = [
    { name: 'DHL Express', logo: 'DHL', amount: 1243, color: 'bg-yellow-100/70 text-yellow-800' },
    { name: 'Aramex Delivery', logo: 'Aramex', amount: 142, color: 'bg-red-100/70 text-red-800' },
    { name: 'Elite Shipping', logo: 'Elite', amount: 43, color: 'bg-gray-100/70 text-gray-800' },
    { name: 'Orrem shipment', logo: 'Orrem', amount: 31, color: 'bg-purple-100/70 text-purple-800' },
];

type ViewType = 'List' | 'Add';

// --- UTILITY COMPONENTS & FUNCTIONS ---

const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;
const formatAmount = (amount: number) => `$${amount.toLocaleString()}`;

interface LogoProps {
    text: string;
    bgColor: string;
    textColor: string;
}

const CarrierLogo: React.FC<LogoProps> = ({ text, bgColor, textColor }) => (
    <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${bgColor} ${textColor} text-xs font-semibold p-1`}>
        {/* Using placeholder images for a better visual representation of the provided design */}
        {text === 'DHL' && <img src="https://placehold.co/40x40/FFCC00/000000?text=DHL" alt="DHL" className="rounded-md" />}
        {text === 'Aramex' && <img src="https://placehold.co/40x40/E30613/FFFFFF?text=Aramex" alt="Aramex" className="rounded-md" />}
        {text === 'Elite' && <img src="https://placehold.co/40x40/333333/FFFFFF?text=Elite" alt="Elite" className="rounded-md" />}
        {text === 'Orrem' && <div className="w-full h-full rounded-full bg-purple-600 flex items-center justify-center text-white text-xl">O</div>}
        {text !== 'DHL' && text !== 'Aramex' && text !== 'Elite' && text !== 'Orrem' && text}
    </div>
);

// Simple icon for dropdown menu
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);


// --- ADD CARRIER FORM COMPONENT ---

interface AddCarrierFormProps {
    onBack: () => void;
}

const AddCarrierForm: React.FC<AddCarrierFormProps> = ({ onBack }) => {
    // In a real application, you would handle form state here
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Carrier saved! Returning to list.');
        onBack();
    }

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 mt-6">
            
            {/* Form Header/Breadcrumb */}
            <div className="pb-6 border-b border-gray-100 mb-6">
                <button 
                    onClick={onBack}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition"
                >
                    Shipping <span className="mx-1 text-gray-300">›</span> <span className="text-gray-800 font-medium">Add shipping</span>
                </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Add carrier</h2>
                
                <div className="space-y-6">
                    {/* Shipping Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Company Name</label>
                        <input
                            type="text"
                            placeholder="e.g Aramex, DHL"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                        />
                    </div>

                    {/* Service Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                        <div className="relative">
                            <select
                                defaultValue="Standard"
                                className="appearance-none w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                            >
                                <option value="Standard">Standard</option>
                                <option value="Express">Express</option>
                                <option value="Priority">Priority</option>
                            </select>
                            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* Cost Calculation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cost Calculation</label>
                        <div className="relative">
                            <select
                                defaultValue="API"
                                className="appearance-none w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                            >
                                <option value="API">Calculate via API</option>
                                <option value="Fixed">Fixed Rate</option>
                            </select>
                            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Save button */}
                <div className="pt-8 flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/50"
                    >
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    );
};


// --- SHIPPING METHOD LIST CONTENT ---

const ShippingMethodList: React.FC<{ switchToAddView: () => void }> = ({ switchToAddView }) => (
    <>
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {cardData.map((card, index) => (
            <div 
                key={index} 
                className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-center justify-between transition hover:shadow-lg hover:border-blue-200"
            >
                <div className="flex items-start">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg mr-4 ${card.color} font-bold text-lg`}>
                        <CarrierLogo 
                            text={card.logo} 
                            bgColor={card.color.split(' ')[0]} 
                            textColor={card.color.split(' ')[1]}
                        />
                    </div>
                    <div>
                        <p className="text-lg font-medium text-gray-800">{card.name}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{formatAmount(card.amount)}</p>
                        <p className="text-xs text-gray-500">Total amount</p>
                    </div>
                </div>
            </div>
            ))}
        </div>

        {/* Shipping Method List Header */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Shipping Method</h2>
            <button
            onClick={switchToAddView}
            className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-500/50"
            >
            <Plus size={16} className="mr-1" />
            Add new
            </button>
        </div>

        {/* Shipping Method Cards */}
        <div className="space-y-4">
            {mockCarriers.map(carrier => (
            <div 
                key={carrier.id} 
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between transition hover:shadow-lg"
            >
                {/* Left Side: Carrier Details */}
                <div className="flex items-center">
                <CarrierLogo 
                    text={carrier.logo} 
                    bgColor={cardData.find(d => d.logo === carrier.logo)?.color.split(' ')[0] || 'bg-gray-200'}
                    textColor={cardData.find(d => d.logo === carrier.logo)?.color.split(' ')[1] || 'text-gray-800'}
                />
                <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-900">{carrier.name}</p>
                    <p className="text-red-500 font-medium text-sm mt-0.5">{formatPrice(carrier.price)}</p>
                    <p className="text-xs text-gray-600 mt-1">
                    *{carrier.details} max {carrier.maxWeight} {carrier.noPoBox ? '' : 'No PO Box'}
                    </p>
                </div>
                </div>

                {/* Right Side: Action Button */}
                <button
                    // Mock action: In a real app, this would open an edit form
                    onClick={() => console.log(`Editing ${carrier.name}`)}
                    className="text-gray-500 hover:text-blue-600 p-2 rounded-full transition"
                >
                    <Calendar size={20} />
                </button>
            </div>
            ))}
        </div>
    </>
);


// --- MAIN SHIPPING DASHBOARD COMPONENT ---

const ShippingDashboard: React.FC = () => {
  const [view, setView] = useState<ViewType>('List');

  const switchToAddView = useCallback(() => setView('Add'), []);
  const switchToListView = useCallback(() => setView('List'), []);

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-sans">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
            {view === 'List' ? 'Shipping' : 'Add New Shipping Carrier'}
        </h1>
        
        {view === 'List' ? (
            <ShippingMethodList switchToAddView={switchToAddView} />
        ) : (
            <AddCarrierForm onBack={switchToListView} />
        )}
    </div>
  );
};

// The main App component now renders the ShippingDashboard
const App: React.FC = () => {
  return (
    <div className="font-sans antialiased">
      <ShippingDashboard />
    </div>
  );
};

export default App;
