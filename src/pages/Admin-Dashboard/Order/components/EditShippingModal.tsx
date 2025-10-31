

import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Order } from "../data";
import { formatCurrency } from "../utils";
 

interface Props {
  isVisible: boolean;
  onClose: () => void;
  order: Order | null;
}

const EditShippingModal: React.FC<Props> = ({ isVisible, onClose, order }) => {
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("");
  const [phone, setPhone] = useState("");

  if (!isVisible || !order) return null;

  const handleUpdate = () => {
    console.log("Updated shipping:", { address, method, phone });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-md p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Shipping Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Shipping Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              placeholder="Enter shipping address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Shipping Method
              </label>
              <div className="relative">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option>DHL Express</option>
                  <option>FedEx Ground</option>
                  <option>UPS Standard</option>
                  <option>USPS Priority</option>
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Products</h3>
            <div className="space-y-4">
              {order.products.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{i + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{p.name}</p>
                      <p className="text-sm text-gray-500">{p.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {p.quantity} × {formatCurrency(p.pricePerUnit)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total: {formatCurrency(p.quantity * p.pricePerUnit)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Update Shipping
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditShippingModal;











// import React, { useState } from 'react';
// import { ChevronDown, X } from 'lucide-react';
// import { Order } from '../data';
// import { formatCurrency } from '../utils';

// interface EditShippingModalProps {
//   isVisible: boolean;
//   onClose: () => void;
//   order: Order | null;
// }

// const EditShippingModal: React.FC<EditShippingModalProps> = ({ isVisible, onClose, order }) => {
//   const [address, setAddress] = useState('');
//   const [method, setMethod] = useState('');
//   const [phone, setPhone] = useState('');
  
//   if (!isVisible || !order) return null;
  
//   const handleUpdate = () => {
//     console.log('Updating shipping details:', { address, method, phone });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-md p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
//         <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-gray-900">Edit Shipping details</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
//             <X size={24} />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="space-y-3">
//             <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">Edit Shipping Address</label>
//             <textarea
//               id="shippingAddress"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
//               rows={3}
//               placeholder="Enter shipping address"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-3">
//               <label htmlFor="shippingMethod" className="block text-sm font-medium text-gray-700">Shipping method</label>
//               <div className="relative">
//                 <select
//                   id="shippingMethod"
//                   value={method}
//                   onChange={(e) => setMethod(e.target.value)}
//                   className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
//                 >
//                   <option>DHL Express</option>
//                   <option>FedEx Ground</option>
//                   <option>UPS Standard</option>
//                   <option>USPS Priority</option>
//                 </select>
//                 <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             <div className="space-y-3">
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
//               <input
//                 id="phone"
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 placeholder="(123) 456-7890"
//               />
//             </div>
//           </div>

//           {/* Product list in modal */}
//           <div className="border-t border-gray-200 pt-6">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Products</h3>
//             <div className="space-y-4">
//               {order.products.map((product, index) => (
//                 <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <span className="text-blue-600 font-semibold">{index + 1}</span>
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">{product.name}</p>
//                       <p className="text-sm text-gray-500">{product.sku}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-medium text-gray-900">{product.quantity} × {formatCurrency(product.pricePerUnit)}</p>
//                     <p className="text-sm text-gray-500">Total: {formatCurrency(product.quantity * product.pricePerUnit)}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
//           <button
//             onClick={onClose}
//             className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleUpdate}
//             className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
//           >
//             Update Shipping
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditShippingModal;
