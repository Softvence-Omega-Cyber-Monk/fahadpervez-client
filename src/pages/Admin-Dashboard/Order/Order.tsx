import React, { useState, useCallback } from 'react';
import { Order, View } from './data';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import EditShippingModal from './components/EditShippingModal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const handleSelectOrder = useCallback((order: Order) => {
  //   setSelectedOrder(order);
  //   setCurrentView('details');
  // }, []);

  const handleBackToList = useCallback(() => {
    setCurrentView('list');
    setSelectedOrder(null);
  }, []);

  const handleEditShipping = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  return (
    <div className="font-sans antialiased bg-gray-50">
      {currentView === 'list' && <OrderList  />}
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
