  









import React, { useState, useCallback } from "react";
import { Plus, Calendar } from "lucide-react";
import {
  useGetAllShipmentsQuery,
  // useGetActiveShipmentsQuery,
  useAddShipmentMutation,
  useUpdateShipmentMutation,
  useDeleteShipmentMutation,
  useToggleShipmentStatusMutation,
} from "@/Redux/Features/Shipment/shipment.api";

// --- TYPE DEFINITIONS ---
interface Shipment {
  _id: string;
  name: string;
  code: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive: boolean;
  logo?: string;
  trackingUrl?: string;
}


interface TotalCardData {
    id: string;
    name: string;
    totalAmount: number;
    logo?: string;
    // Added logoClass for background color matching the image
    logoClass: string; 
}

// Mock data for the top cards to match the image UI
const mockTotalCardsData: TotalCardData[] = [
    { id: 'dhl', name: 'DHL Express', totalAmount: 1243, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/DHL_Logo.svg/100px-DHL_Logo.svg.png', logoClass: 'bg-yellow-500' },
    { id: 'aramex', name: 'Aramex Delivery', totalAmount: 142, logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Aramex_logo_2022.svg', logoClass: 'bg-red-600' },
    { id: 'elite', name: 'Elite Shipping', totalAmount: 43, logo: 'https://via.placeholder.com/40/0a0a0a/ffffff?text=E', logoClass: 'bg-gray-800' },
    { id: 'orrem', name: 'Orrem shipment', totalAmount: 31, logo: 'https://via.placeholder.com/40/8B5CF6/ffffff?text=O', logoClass: 'bg-purple-500' },
];

  

const TotalCards: React.FC = () => {

    const getLogoProps = (carrier: TotalCardData) => {
        // Map carrier names/ids to specific logo styles from the image
        if (carrier.name.includes("DHL")) return { text: "DHL", logo: carrier.logo, bgColor: "bg-yellow-500", textColor: "text-white" };
        if (carrier.name.includes("Aramex")) return { text: "Aramex", logo: carrier.logo, bgColor: "bg-red-600", textColor: "text-white" };
        if (carrier.name.includes("Elite")) return { text: "Elite", logo: carrier.logo, bgColor: "bg-gray-800", textColor: "text-white" };
        if (carrier.name.includes("Orrem")) return { text: "O", logo: carrier.logo, bgColor: "bg-purple-500", textColor: "text-white" };
        return { text: carrier.name[0], logo: carrier.logo, bgColor: "bg-gray-100", textColor: "text-gray-800" };
    };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
            {mockTotalCardsData.map((carrier) => {
                const logoProps = getLogoProps(carrier);
                return (
                    // Card structure matching the image
                    <div key={carrier.id} className="bg-white p-5   rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center">
                                <CarrierLogo {...logoProps} />
                                <span className="ml-2 text-base font-medium text-gray-800">{carrier.name}</span>
                            </div>
                            {/* Amount */}
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-900 leading-none">{formatAmount(carrier.totalAmount)}</p>
                            </div>
                        </div>
                        {/* Total amount label */}
                        <p className="text-base mt-7 text-gray-500 ">Total amount</p>
                    </div>
                );
            })}
        </div>
    );
};


// --- UTILITY COMPONENTS ---
const formatAmount = (amount: number) => `$${amount.toLocaleString()}`;

interface LogoProps {
  text: string;
  logo?: string;
  bgColor: string;
  textColor: string;
}

const CarrierLogo: React.FC<LogoProps> = ({ text, logo, bgColor, textColor }) => (
  <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${bgColor} ${textColor} text-xs font-semibold p-1`}>
    {logo ? <img src={logo} alt={text} className="rounded-md w-full h-full object-cover" /> : text[0]}
  </div>
);

 

// --- ADD CARRIER FORM COMPONENT ---
interface AddCarrierFormProps {
  onBack: () => void;
  shipmentToEdit?: Shipment;
}

// const AddCarrierForm: React.FC<AddCarrierFormProps> = ({ onBack, shipmentToEdit }) => {
//   const [form, setForm] = useState({
//     name: shipmentToEdit?.name || "",
//     code: shipmentToEdit?.code || "",
//     description: shipmentToEdit?.description || "",
//     contactEmail: shipmentToEdit?.contactEmail || "",
//     contactPhone: shipmentToEdit?.contactPhone || "",
//     logo: shipmentToEdit?.logo || "",
//     trackingUrl: shipmentToEdit?.trackingUrl || "",
//     isActive: shipmentToEdit?.isActive ?? true,
//   });

//   const [addShipment] = useAddShipmentMutation();
//   const [updateShipment] = useUpdateShipmentMutation();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (shipmentToEdit) {
//         await updateShipment({ id: shipmentToEdit._id, data: form });
//       } else {
//         await addShipment(form);
//       }
//       onBack();
//     } catch (err) {
//       console.error(err);
//       alert("Error saving shipment");
//     }
//   };

//   const handleCancel = () => {
//   console.log("Cancel button clicked. Discarding changes...");
//   onBack();
// };
//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 mt-6">
//       <div className="pb-6 border-b border-gray-100 mb-6">
//         <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition">
//           Shipping <span className="mx-1 text-gray-300">›</span> <span className="text-gray-800 font-medium">{shipmentToEdit ? "Edit" : "Add"} shipping</span>
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Company Name</label>
//           <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="e.g Aramex, DHL" />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
//           <input type="text" name="code" value={form.code} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="Unique code" />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//           <input type="text" name="description" value={form.description} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="Optional description" />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
//           <input type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="info@company.com" />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
//           <input type="text" name="contactPhone" value={form.contactPhone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="+971-4-987-6543" />
//         </div>

//         {/* <div className="pt-8 flex justify-end">
//           <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/50">
//             Save changes
//           </button>
//         </div> */}

// <div className="pt-8 flex justify-end space-x-4">
//   <button
//     type="button"
//     onClick={handleCancel}
//     className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
//   >
//     Cancel
//   </button>
//   <button
//     type="submit"
//     className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/50"
//   >
//     Save changes
//   </button>
// </div>

        
//       </form>
//     </div>
//   );
// };

// --- SHIPPING METHOD LIST ---

const AddCarrierForm: React.FC<AddCarrierFormProps> = ({ onBack, shipmentToEdit }) => {
  const [form, setForm] = useState({
    name: shipmentToEdit?.name || "",
    code: shipmentToEdit?.code || "",
    description: shipmentToEdit?.description || "",
    contactEmail: shipmentToEdit?.contactEmail || "",
    contactPhone: shipmentToEdit?.contactPhone || "",
    logo: shipmentToEdit?.logo || "",
    trackingUrl: shipmentToEdit?.trackingUrl || "",
    isActive: shipmentToEdit?.isActive ?? true,
  });

  const [addShipment] = useAddShipmentMutation();
  const [updateShipment] = useUpdateShipmentMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file); // Converts the file to Base64
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (shipmentToEdit) {
        await updateShipment({ id: shipmentToEdit._id, data: form });
      } else {
        await addShipment(form);
      }
      onBack();
    } catch (err) {
      console.error(err);
      alert("Error saving shipment");
    }
  };

  const handleCancel = () => {
    console.log("Cancel button clicked. Discarding changes...");
    onBack();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 mt-6">
      <div className="pb-6 border-b border-gray-100 mb-6">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition">
          Shipping <span className="mx-1 text-gray-300">›</span> <span className="text-gray-800 font-medium">{shipmentToEdit ? "Edit" : "Add"} shipping</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Company Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="e.g Aramex, DHL" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
          <input type="text" name="code" value={form.code} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="Unique code" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <input type="text" name="description" value={form.description} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="Optional description" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
          <input type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="info@company.com" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
          <input type="text" name="contactPhone" value={form.contactPhone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="+971-4-987-6543" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
          <input type="file" accept="image/*" onChange={handleLogoChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          {form.logo && (
            <img src={form.logo} alt="Logo preview" className="mt-2 h-16 object-contain border rounded" />
          )}
        </div>

        <div className="pt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
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



interface ShippingMethodListProps {
  switchToAddView: (shipment?: Shipment) => void;
}

const ShippingMethodList: React.FC<ShippingMethodListProps> = ({ switchToAddView }) => {
  const { data: shipments } = useGetAllShipmentsQuery({});
  const [deleteShipment] = useDeleteShipmentMutation();
  const [toggleShipment] = useToggleShipmentStatusMutation();
console.log(shipments)
console.log(deleteShipment)
console.log(toggleShipment)


  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      await deleteShipment(id);
    }
  };

  const handleToggleStatus = async (id: string) => {
    await toggleShipment(id);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Shipping Method</h2>
        <button onClick={() => switchToAddView()} className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-500/50">
          <Plus size={16} className="mr-1" />
          Add new
        </button>
      </div>

      <div className="space-y-4">
        {shipments?.data?.map((carrier: Shipment) => (
          <div key={carrier._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between transition hover:shadow-lg">
            <div className="flex items-center">
              <CarrierLogo text={carrier.name} logo={carrier.logo} bgColor="bg-gray-100" textColor="text-gray-800" />
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-900">{carrier.name}</p>
                <p className="text-xs text-gray-500">{carrier.description || "No description"}</p>
                <p className="text-xs text-gray-400 mt-1">{carrier.contactEmail}</p>
                <p className="text-xs text-gray-400">{carrier.contactPhone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button onClick={() => switchToAddView(carrier)} className="text-gray-500 hover:text-blue-600 p-2 rounded-full transition">
                <Calendar size={20} />
              </button>
              <button onClick={() => handleToggleStatus(carrier._id)} className={`px-3 py-1 rounded-full text-white ${carrier.isActive ? "bg-green-500" : "bg-red-500"} text-sm`}>
                {carrier.isActive ? "Active" : "Inactive"}
              </button>
              <button onClick={() => handleDelete(carrier._id)} className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-sm hover:bg-gray-400">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// --- MAIN DASHBOARD ---
type ViewType = "List" | "Add";

const ShippingDashboard: React.FC = () => {
  const [view, setView] = useState<ViewType>("List");
  const [shipmentToEdit, setShipmentToEdit] = useState<Shipment | undefined>(undefined);

  const switchToAddView = useCallback((shipment?: Shipment) => {
    setShipmentToEdit(shipment);
    setView("Add");
  }, []);

  const switchToListView = useCallback(() => {
    setShipmentToEdit(undefined);
    setView("List");
  }, []);

  return (
    <div className="p-4 sm:p-8 min-h-screen font-sans">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        {view === "List" ? "Shipping" : shipmentToEdit ? "Edit Shipping Carrier" : "Add New Shipping Carrier"}
      </h1>
      <TotalCards/>
      {view === "List" ? <ShippingMethodList switchToAddView={switchToAddView} /> : <AddCarrierForm shipmentToEdit={shipmentToEdit} onBack={switchToListView} />}
    </div>
  );
};

export default ShippingDashboard;




// i will add this later dont delete it






 // import { useGetAllShipmentsQuery } from "@/Redux/Features/Shipment/shipment.api";

// interface Shipment {
//   _id: string;
//   name: string;
//   code: string;
//   description?: string;
//   contactEmail?: string;
//   contactPhone?: string;
//   logo?: string;
//   isActive?: boolean;
//   trackingUrl?: string;
//   createdAt?: string;
//   updatedAt?: string;
//   price?: number; // optional, if you plan to add it
//   estimatedDelivery?: string; // optional
// }

// export default function ShippingMethod() {
//   const { data: shipmentsData } = useGetAllShipmentsQuery({});
//   const shipments: Shipment[] = shipmentsData?.data || [];

//   return (
//     <div className="bg-gray-100">
//       <div className="bg-white w-full rounded-lg shadow-sm p-6 sm:p-8">
//         <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
//           Shipping Method
//         </h1>

//         <div className="space-y-4 mb-6">
//           {shipments.map((shipment: Shipment) => (
//             <div
//               key={shipment._id}
//               className="border-2 border-gray-200 rounded-lg p-4 sm:p-5 bg-white hover:border-gray-300 transition-colors cursor-pointer"
//             >
//               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                 <div className="flex items-start gap-3 sm:gap-4">
//                   <div
//                     className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded flex items-center justify-center ${
//                       shipment.logo ? "" : "bg-gray-900"
//                     }`}
//                   >
//                     {shipment.logo ? (
//                       <img
//                         src={shipment.logo}
//                         alt={shipment.name}
//                         className="w-full h-full object-contain rounded"
//                       />
//                     ) : (
//                       <span className="text-white font-bold text-xl sm:text-2xl">
//                         {shipment.name.charAt(0)}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
//                       {shipment.name}
//                     </h3>
//                     <p className="text-blue-600 font-medium text-base sm:text-lg mb-1">
//                       ${shipment.price || "N/A"}
//                     </p>
//                     <p className="text-xs sm:text-sm text-gray-600">
//                       {shipment.description || "*Full tracking info not available"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-xs sm:text-sm text-gray-600 sm:text-right whitespace-nowrap">
//                   EST. Delivery date {shipment.estimatedDelivery || "N/A"}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium text-base sm:text-lg px-8 py-3 rounded-lg transition-colors">
//           Save and continue
//         </button>
//       </div>
//     </div>
//   );
// }



