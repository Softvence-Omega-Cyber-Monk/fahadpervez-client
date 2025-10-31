import { useState, useEffect } from 'react';
import { CreditCard, ShoppingCart, Lock, AlertCircle, CheckCircle, Loader } from 'lucide-react';

// Declare Checkout on window
declare global {
  interface Window {
    Checkout: any;
    errorCallback: (error: any) => void;
    cancelCallback: () => void;
    completeCallback: (resultIndicator: string) => void;
  }
}

const CheckoutPage = () => {
  const [_sessionId, setSessionId] = useState('');
  const [successIndicator, setSuccessIndicator] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [checkoutInitialized, setCheckoutInitialized] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentOperation, setPaymentOperation] = useState<'PURCHASE' | 'VERIFY'>('PURCHASE');

  // Product details (example)
  const [cartItems] = useState([
    { id: 1, name: 'Premium Headphones', price: 149.99, quantity: 1 },
    { id: 2, name: 'Wireless Mouse', price: 49.99, quantity: 2 },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Load Mastercard Checkout script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://afs.gateway.mastercard.com/static/checkout/checkout.min.js';
    script.async = true;
    
    script.onload = () => {
      console.log('Mastercard Checkout script loaded');
      setScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Mastercard Checkout script');
      setError('Failed to load payment form. Please refresh the page.');
    };

    document.body.appendChild(script);

    // Define global callbacks
    window.errorCallback = (error) => {
      console.error('Checkout error:', error);
      setError('An error occurred during checkout. Please try again.');
      setLoading(false);
    };

    window.cancelCallback = () => {
      console.log('Payment cancelled');
      setError('Payment was cancelled.');
      setLoading(false);
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Initialize checkout session
  const initializeCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/v1/afspay/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total.toFixed(2),
          currency: 'USD',
          description: 'Order payment',
          operation: paymentOperation,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSessionId(data.data.sessionId);
        setSuccessIndicator(data.data.successIndicator);
        setOrderId(data.data.orderId);
        
        console.log('Session initialized:', {
          sessionId: data.data.sessionId,
          orderId: data.data.orderId,
        });

        // Wait for script to load before configuring
        if (scriptLoaded && window.Checkout) {
          configureCheckout(data.data.sessionId);
        } else {
          // Wait a bit for script to load
          setTimeout(() => {
            if (window.Checkout) {
              configureCheckout(data.data.sessionId);
            } else {
              setError('Payment form not ready. Please refresh and try again.');
              setLoading(false);
            }
          }, 1000);
        }
      } else {
        setError(data.message || 'Failed to initialize checkout');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Checkout initialization error:', err);
      setLoading(false);
    }
  };

  // Configure Mastercard Checkout
  const configureCheckout = (sessionId: string) => {
    if (!window.Checkout) {
      setError('Checkout library not loaded. Please refresh the page.');
      setLoading(false);
      return;
    }

    try {
      console.log('Configuring checkout with session:', sessionId);
      
      window.Checkout.configure({
        session: {
          id: sessionId,
        },
      });

      setCheckoutInitialized(true);
      setLoading(false);

      // Automatically show embedded page after configuration
      setTimeout(() => {
        showPaymentForm();
      }, 500);
    } catch (err) {
      console.error('Error configuring checkout:', err);
      setError('Failed to configure payment form. Please try again.');
      setLoading(false);
    }
  };

  // Show payment form
  const showPaymentForm = () => {
    if (!window.Checkout) {
      setError('Checkout library not loaded. Please refresh the page.');
      return;
    }

    try {
      console.log('Showing embedded payment page');
      window.Checkout.showEmbeddedPage('#checkout-container');
    } catch (err) {
      console.error('Error showing payment form:', err);
      setError('Failed to display payment form. Please try again.');
    }
  };

  // Handle payment completion
  useEffect(() => {
    if (successIndicator) {
      window.completeCallback = (resultIndicator: string) => {
        console.log('Payment completed:', { resultIndicator, successIndicator });
        
        if (resultIndicator === successIndicator) {
          setPaymentSuccess(true);
          setError('');
        } else {
          setError('Payment verification failed. Please try again.');
        }
      };
    }
  }, [successIndicator]);

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="font-mono text-sm font-semibold text-gray-800">{orderId}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Make Another Purchase
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Secure Checkout</h1>
          <div className="flex items-center justify-center gap-2 text-green-600">
            <Lock className="w-5 h-5" />
            <span className="text-sm font-medium">SSL Encrypted Payment</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-800">Payment Error</p>
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {!checkoutInitialized ? (
                <div className="text-center py-12">
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">Select payment type:</p>
                    <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
                      <button
                        onClick={() => setPaymentOperation('PURCHASE')}
                        disabled={loading}
                        className={`px-6 py-2 rounded-md font-medium transition ${
                          paymentOperation === 'PURCHASE'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-800'
                        } disabled:opacity-50`}
                      >
                        Pay Now
                      </button>
                      <button
                        onClick={() => setPaymentOperation('VERIFY')}
                        disabled={loading}
                        className={`px-6 py-2 rounded-md font-medium transition ${
                          paymentOperation === 'VERIFY'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-800'
                        } disabled:opacity-50`}
                      >
                        Verify Card
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {paymentOperation === 'PURCHASE' 
                        ? 'Complete payment immediately'
                        : 'Verify card without charging (amount will be $0)'}
                    </p>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Click below to proceed with secure payment
                  </p>
                  <button
                    onClick={initializeCheckout}
                    disabled={loading || !scriptLoaded}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Initializing Payment...
                      </>
                    ) : !scriptLoaded ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Proceed to Payment
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Test Card:</strong> 5123456789012346 | Exp: 12/25 | CVV: 123
                    </p>
                  </div>
                  
                  {/* Checkout Container */}
                  <div 
                    id="checkout-container" 
                    className="min-h-[500px] border-2 border-gray-200 rounded-lg p-4"
                  ></div>
                  
                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>Your payment information is encrypted and secure</p>
                  </div>
                </div>
              )}

              {/* Security Badges */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>PCI DSS Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Mastercard Gateway</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;