interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
}

const HowItWorks = () => {
  const steps: Step[] = [
    {
      id: 1,
      number: '01',
      title: 'Choose Your Products',
      description: 'Browse through our extensive collection of high-quality medicines across different categories.'
    },
    {
      id: 2,
      number: '02',
      title: 'Add to Cart & Customize',
      description: 'Add your preferred items to the cart and customize your order as needed.'
    },
    {
      id: 3,
      number: '03',
      title: 'Checkout & Payment',
      description: 'Proceed to checkout and securely pay with a variety of payment methods.'
    },
    {
      id: 4,
      number: '04',
      title: 'Order Confirmation & Tracking',
      description: 'You will receive an email confirmation and tracking number for your order.'
    },
    {
      id: 5,
      number: '05',
      title: 'Fast & Secure Delivery',
      description: "We'll deliver your products safely and on-time, ensuring a great experience."
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Steps */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8">HOW IT WORKS</h2>
            
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.id} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Medical Kit Illustration */}
          <div className="flex items-center justify-center">
            <img src="./medicalbox.png" alt="medicalbox" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;