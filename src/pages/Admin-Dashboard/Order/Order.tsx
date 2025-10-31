 






import React, { useState, useCallback } from 'react';
import { Order, View } from './data';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import EditShippingModal from './components/EditShippingModal';
// import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  // Set initial view as 'list'
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const location = useLocation();

  // Handle selecting an order → switch to details view
  // const handleSelectOrder = useCallback((order: Order) => {
  //   setSelectedOrder(order);
  //   setCurrentView('details');
  // }, []);

  // Handle going back to order list
  const handleBackToList = useCallback(() => {
    setCurrentView('list');
    setSelectedOrder(null);
  }, []);

  // Show the shipping edit modal
  const handleEditShipping = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  return (
    <div className="font-sans antialiased">
      {currentView === 'list' && (
        <OrderList  />
      )}

      {currentView === 'details' && selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onBack={handleBackToList}
          onEditShipping={handleEditShipping}
        />
      )}

      <EditShippingModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default App;









// import React, { useState, useCallback } from 'react';
// import { Order, View } from './data';
// import OrderList from './components/OrderList';
// import OrderDetails from './components/OrderDetails';
// import EditShippingModal from './components/EditShippingModal';
// import { useLocation } from 'react-router-dom';

// const App: React.FC = () => {
//   const [currentView, setCurrentView] = useState<View>([list,details]);
//   // const [currentdetails, setcurrentdetails] = useState<View>('details');
//   console.log(currentView)
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
// const location=useLocation()
// // console.log(location)
//   // const handleSelectOrder = useCallback((order: Order) => {
//   //   setSelectedOrder(order);
//   //   setCurrentView('details');
//   // }, []);

//   const handleBackToList = useCallback(() => {
//     setCurrentView('list');
//     setSelectedOrder(null);
//   }, []);

//   const handleEditShipping = useCallback(() => {
//     setIsModalVisible(true);
//   }, []);

//   return (
//     <div className="font-sans antialiased  ">
//       {currentView === 'list' && <OrderList  />}
//       {currentView === 'details' && selectedOrder && (
//         <OrderDetails
//           order={selectedOrder}
//           onBack={handleBackToList}
//           onEditShipping={handleEditShipping}
//         />
//       )}





//       <EditShippingModal
//         isVisible={isModalVisible}
//         onClose={() => setIsModalVisible(false)}
//         order={selectedOrder}
//       />
//     </div>
//   );
// };

// export default App;
