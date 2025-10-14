import React, { useState } from 'react';
import { FileText } from 'lucide-react';

interface ContractInstractionProps {
  onNext: () => void;
}

const ContractInstraction: React.FC<ContractInstractionProps> = ({onNext}) => {
  const [readInstruction, setReadInstruction] = useState<boolean>(false);

  const handleOpenPDF = () => {
    onNext()
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto pt-30">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LET'S SETUP YOUR PROFILE</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus 
            vitae malesuada. A enim convallis eros gravida at id arcu velenatis.
          </p>
        </div>

        {/* Content Container */}
        <div className="p-8">
          <div className="flex items-start justify-between">
            {/* Left Side - Instructions */}
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-6">
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
            <div className='rounded-lg shadow-sm p-4 w-90'>
              <div className='bg-white'>
                <h3 className="text-lg font-semibold text-gray-900 pb-4 border-b border-gray-200">
                View and sign with you seal
              </h3>

              <button
                onClick={handleOpenPDF}
                className="w-full mt-4 bg-blue-600 text-white py-6 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 cursor-pointer">
                <span><FileText className='w-4 h-4' /></span>
                <span className='text-sm'>Open the PDF</span>
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractInstraction;