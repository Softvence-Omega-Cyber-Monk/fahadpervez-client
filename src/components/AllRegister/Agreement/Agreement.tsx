import React, { useState } from 'react';


interface AgreementProps {
  onNext: () => void;
}

const Agreement: React.FC<AgreementProps> = ({onNext}) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      console.log('Agreement accepted');
      onNext();
    } else {
      alert('Please scroll through and review the entire agreement before accepting.');
    }
  };

  return (
    <div className="min-h-screen pt-30">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-8">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            SELLER AGREEMENT/<br />CONTRACT
          </h1>

          {/* Contract Content */}
          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            {/* Introduction */}
            <div>
              <p className="mb-4">
                This Seller Agreement ("Agreement") is entered into as of the date of electronic acceptance between the seller ("Seller") and [Platform Name] ("Platform").
              </p>
              <p>
                By registering as a Seller on the Platform, you agree to be bound by the terms and conditions set forth in this Agreement.
              </p>
            </div>

            {/* Seller Account Creation */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Seller Account Creation</h2>
              <p className="mb-3">
                To sell products on the Platform, the Seller must create an account by providing accurate and complete information. The Seller is responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.
              </p>
              <p>
                The Seller agrees to notify the Platform immediately of any unauthorized use of their account or any other breach of security. The Platform shall not be liable for any loss or damage arising from the Seller's failure to comply with this security obligation.
              </p>
            </div>

            {/* Product Listings */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Product Listings</h2>
              <p className="mb-3">
                The Seller agrees to provide accurate and complete information about the products they list for sale on the Platform. This includes, but is not limited to, product descriptions, images, pricing, and availability.
              </p>
              <p className="mb-3">
                The Seller warrants that all products listed comply with applicable laws and regulations, including product safety standards and labeling requirements. The Seller agrees not to list prohibited items, counterfeit goods, or any products that infringe on third-party intellectual property rights.
              </p>
              <p>
                The Platform reserves the right to remove any product listing that violates this Agreement or applicable laws without prior notice to the Seller.
              </p>
            </div>

            {/* Pricing and Payments */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Pricing and Payments</h2>
              <p className="mb-3">
                The Seller is responsible for setting the price of their products. All prices must be clearly stated and include any applicable taxes unless otherwise specified. The Seller agrees to honor the prices displayed at the time of purchase.
              </p>
              <p className="mb-3">
                The Platform will collect payments from buyers on behalf of the Seller. After deducting applicable fees and commissions as outlined in the Fee Schedule, the Platform will remit the remaining balance to the Seller according to the payment schedule agreed upon.
              </p>
              <p>
                The Seller authorizes the Platform to hold funds in accordance with the Platform's payment processing policies and agrees to provide accurate banking information for payment transfers.
              </p>
            </div>

            {/* Order Fulfillment */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Order Fulfillment</h2>
              <p className="mb-3">
                Upon receiving an order, the Seller agrees to fulfill the order promptly and ship the product within the timeframe specified in the product listing or as otherwise communicated to the buyer.
              </p>
              <p className="mb-3">
                The Seller is responsible for packaging products securely and selecting appropriate shipping methods. The Seller must provide tracking information to the Platform and the buyer when available.
              </p>
              <p>
                In the event that the Seller is unable to fulfill an order, they must notify the Platform and the buyer immediately. The Seller may be subject to penalties or account suspension for failure to fulfill orders without valid justification.
              </p>
            </div>

            {/* Returns and Refunds */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Returns and Refunds</h2>
              <p className="mb-3">
                The Seller agrees to comply with the Platform's return and refund policy. Buyers may return products within the specified return period if the product is defective, not as described, or damaged during shipping.
              </p>
              <p className="mb-3">
                The Seller is responsible for processing returns and issuing refunds in accordance with the Platform's policies. Return shipping costs may be the responsibility of the Seller if the return is due to seller error or product defects.
              </p>
              <p>
                The Platform may issue refunds to buyers on behalf of the Seller and deduct the refunded amount from the Seller's account balance.
              </p>
            </div>

            {/* Fees and Commission */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Fees and Commission</h2>
              <p className="mb-3">
                The Seller agrees to pay the Platform fees and commissions as outlined in the Fee Schedule. These fees may include, but are not limited to, listing fees, transaction fees, payment processing fees, and subscription fees.
              </p>
              <p className="mb-3">
                The Platform reserves the right to modify the Fee Schedule with reasonable notice to the Seller. Continued use of the Platform after such modifications constitutes acceptance of the new fees.
              </p>
              <p>
                All fees are non-refundable unless otherwise specified by the Platform.
              </p>
            </div>

            {/* Prohibited Activities */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Prohibited Activities</h2>
              <p className="mb-3">
                The Seller agrees not to engage in any activities that violate this Agreement, applicable laws, or the Platform's policies. Prohibited activities include, but are not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                <li>Selling counterfeit, stolen, or illegal products</li>
                <li>Manipulating product reviews or ratings</li>
                <li>Engaging in fraudulent or deceptive practices</li>
                <li>Circumventing the Platform's payment system</li>
                <li>Infringing on intellectual property rights</li>
                <li>Harassing or abusing buyers or Platform staff</li>
              </ul>
              <p>
                Violation of these prohibitions may result in immediate suspension or termination of the Seller's account and forfeiture of any outstanding payments.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Intellectual Property</h2>
              <p className="mb-3">
                The Seller retains ownership of all intellectual property rights in the content they upload to the Platform, including product descriptions, images, and trademarks.
              </p>
              <p className="mb-3">
                By uploading content to the Platform, the Seller grants the Platform a non-exclusive, worldwide, royalty-free license to use, reproduce, display, and distribute such content for the purpose of operating and promoting the Platform.
              </p>
              <p>
                The Seller warrants that they have the right to grant this license and that their content does not infringe on any third-party rights.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Termination</h2>
              <p className="mb-3">
                Either party may terminate this Agreement at any time with written notice. Upon termination, the Seller must fulfill all outstanding orders and may not create new product listings.
              </p>
              <p className="mb-3">
                The Platform reserves the right to suspend or terminate the Seller's account immediately if the Seller violates this Agreement or engages in prohibited activities.
              </p>
              <p>
                Upon termination, the Platform will remit any outstanding payments to the Seller, subject to deductions for refunds, chargebacks, or fees owed to the Platform.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Limitation of Liability</h2>
              <p className="mb-3">
                The Platform provides the marketplace "as is" and makes no warranties regarding the Platform's operation, availability, or suitability for the Seller's purposes.
              </p>
              <p className="mb-3">
                To the fullest extent permitted by law, the Platform shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the Seller's use of the Platform or this Agreement.
              </p>
              <p>
                The Platform's total liability to the Seller shall not exceed the fees paid by the Seller to the Platform in the twelve months preceding the claim.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Governing Law</h2>
              <p className="mb-3">
                This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from this Agreement shall be resolved through binding arbitration in accordance with the rules of [Arbitration Association], or through the courts of [Jurisdiction] if arbitration is not available.
              </p>
            </div>

            {/* Amendments */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Amendments</h2>
              <p className="mb-3">
                The Platform reserves the right to modify this Agreement at any time. The Seller will be notified of any material changes via email or through the Platform.
              </p>
              <p>
                Continued use of the Platform after such modifications constitutes the Seller's acceptance of the amended Agreement.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Contact Information</h2>
              <p>
                For questions or concerns regarding this Agreement, please contact us at:
              </p>
              <div className="mt-2 space-y-1">
                <p>Email: support@platform.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Business Street, City, State, ZIP</p>
              </div>
            </div>

            {/* Acknowledgment */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
              <p className="font-semibold text-gray-900 mb-2">
                By clicking "Agree & Continue" below, you acknowledge that you have read, understood, and agree to be bound by this Seller Agreement.
              </p>
            </div>
          </div>

          {/* Scroll Indicator & Accept Button */}
          <div className="mt-8 space-y-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                I have read and agree to the terms and conditions of this Seller Agreement
              </span>
            </label>

            <button
              type="button"
              onClick={handleAccept}
              disabled={!accepted}
              className={`w-full font-medium py-3 rounded-md transition-colors duration-200 ${
                accepted
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Agree & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agreement;