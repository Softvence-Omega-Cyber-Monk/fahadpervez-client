import React, { useState } from 'react';
import AddSignature from './AddSignature';

const ReadSign: React.FC = () => {
  const [signature, setSignature] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleAddSignature = () => setShowModal(true);
  const handleUndo = () => setSignature('');

  const handleAgreeAndContinue = () => {
    if (!signature) {
      alert('Please add your signature first');
      return;
    }
    alert('Agreement signed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto pt-30">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">READ & SIGN PDF</h1>
          <p className="text-sm text-gray-600">
            You have to do or complete process which is enable you on previous screen
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={handleAddSignature}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <span>🖊️</span>
            <span className="font-medium">Add signature</span>
          </button>
          <button
            onClick={handleUndo}
            className="flex items-center space-x-2 bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <span>↶</span>
            <span className="font-medium">Undo</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-10">SELLER AGREEMENT/CONTRACT</h2>

          <div className="mb-20">
            {/* agreement text */}
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed w-[65%]">
              <p>Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.</p>
              <p>Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.</p>
              <p>Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.</p>
              <p>Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.</p>
              <p>Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.Lorem ipsum dolor sit amet consectetur. Proin fermentum fusce in magna est fusce tellus vitae malesuada. A enim convallis eros gravida at id arcu venenatis.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-15">
            <div>
              <div className="border-b-2 border-gray-300 pb-2 min-h-12 flex items-end justify-center">
                {signature && (
                    typeof signature === 'string' && signature.startsWith('data:image') ? (
                        <img src={signature} alt="Signature" className="max-h-16" />
                    ) : (
                        <span className="italic text-gray-700 text-lg">{signature}</span>
                    )
                )}
              </div>
                <label className="block text-md font-semibold text-gray-800 mb-2 text-center mt-3">Your Signature Here</label>
            </div>
            <div>
              <div className="border-b-2 border-gray-300 pb-2 min-h-12 flex items-end justify-center">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-[22%] border-none focus:outline-none text-gray-700 cursor-pointer"
                />
              </div>
              <label className="block text-md font-semibold text-gray-800 mb-2 text-center mt-3">Date</label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAgreeAndContinue}
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Agree & Continue
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <AddSignature
          setShowModal={setShowModal}
          setSignature={setSignature}
        />
      )}
    </div>
  );
};

export default ReadSign;
