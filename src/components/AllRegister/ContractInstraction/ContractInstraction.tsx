import React, { useState } from 'react';


interface ContractInstractionProps {
  onNext: () => void;
}

const ContractInstraction: React.FC<ContractInstractionProps> = ({onNext}) => {
  const [readInstruction, setReadInstruction] = useState<boolean>(false);

  const handleOpenPDF = () => {
    onNext()
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"></div>
          </div>
          <span className="text-2xl font-bold text-blue-600">Logoipsum</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LET'S SETUP YOUR PROFILE</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus 
            vitae malesuada. A enim convallis eros gravida at id arcu velenatis.
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Instructions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                SELLER AGREEMENT/<br />CONTRACT INSTRUCTION
              </h2>

              <ol className="space-y-3 text-gray-700">
                <li className="flex">
                  <span className="font-medium mr-2">1.</span>
                  <span>Open the PDF.</span>
                </li>
                <li className="flex">
                  <span className="font-medium mr-2">2.</span>
                  <span>Read carefully.</span>
                </li>
                <li className="flex">
                  <span className="font-medium mr-2">3.</span>
                  <span>If you ar aggree, sing with us then go to the last page</span>
                </li>
                <li className="flex">
                  <span className="font-medium mr-2">4.</span>
                  <span>and select the sign option and sign here.</span>
                </li>
                <li className="flex">
                  <span className="font-medium mr-2">5.</span>
                  <span>After complete sign then upload your seal .jpg, .png, .pdf.</span>
                </li>
                <li className="flex">
                  <span className="font-medium mr-2">6.</span>
                  <span>save.</span>
                </li>
                <li className="flex">
                  <span className="font-medium mr-2">7.</span>
                  <span>Then confirm upload your contract.</span>
                </li>
              </ol>

              <div className="mt-8">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={readInstruction}
                    onChange={(e) => setReadInstruction(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">I read the all instruction</span>
                </label>
              </div>
            </div>

            {/* Right Side - PDF Viewer */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                View and sign with you seal
              </h3>

              <button
                onClick={handleOpenPDF}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>📄</span>
                <span>Open the PDF</span>
              </button>

              {/* PDF Preview Area */}
              <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-sm">PDF Preview Area</p>
                  <p className="text-xs mt-2">Click "Open the PDF" to view the contract</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractInstraction;