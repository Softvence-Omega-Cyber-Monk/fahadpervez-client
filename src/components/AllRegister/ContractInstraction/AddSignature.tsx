import React, { useEffect, useRef, useState } from 'react';
import { Camera, CircleX, Image, Type } from 'lucide-react';
import { AiFillSignature } from "react-icons/ai";

interface AddSignatureProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSignature: React.Dispatch<React.SetStateAction<string>>;
}

const AddSignature: React.FC<AddSignatureProps> = ({ setShowModal, setSignature }) => {
  const [activeTab, setActiveTab] = useState<'type' | 'draw' | 'upload' | 'camera'>('draw');
  const [typedName, setTypedName] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<number>(0);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const signatureStyles = [
    { name: 'Cursive', font: 'Dancing Script, cursive' },
    { name: 'Elegant', font: 'Great Vibes, cursive' },
    { name: 'Modern', font: 'Allura, cursive' },
    { name: 'Classic', font: 'Pacifico, cursive' },
    { name: 'Formal', font: 'Alex Brush, cursive' },
    { name: 'Script', font: 'Sacramento, cursive' },
  ];

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Great+Vibes&family=Allura&family=Pacifico&family=Alex+Brush&family=Sacramento&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const handleCloseModal = () => {
    setShowModal(false);
    setTypedName('');
    setUploadedImage('');
    setCapturedImage('');
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => setUploadedImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      alert('Camera access denied or not available');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
          setCameraStream(null);
        }
      }
    }
  };

  useEffect(() => {
    if (activeTab === 'camera' && !cameraStream && !capturedImage) {
      startCamera();
    }
  }, [activeTab]);

  const handleSaveSignature = () => {
    if (activeTab === 'type' && typedName) {
      setSignature(typedName);
    } else if (activeTab === 'draw' && canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      setSignature(dataUrl);
    } else if (activeTab === 'upload' && uploadedImage) {
      setSignature(uploadedImage);
    } else if (activeTab === 'camera' && capturedImage) {
      setSignature(capturedImage);
    }
    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 pb-4 border-b border-gray-200">Create signature</h2>

          <div className="flex gap-2 mb-4 justify-center py-8">
            {['type', 'draw', 'upload', 'camera'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-blue-600 text-blue-600'
                }`}
              >
                <span>
                  {tab === 'type'
                    ? <Type />
                    : tab === 'draw'
                    ? <AiFillSignature className='w-6 h-6'/>
                    : tab === 'upload'
                    ? <Image/>
                    : <Camera/>}
                </span>
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>

          {/* Type */}
          {activeTab === 'type' && (
            <div>
              <input
                type="text"
                value={typedName}
                onChange={e => setTypedName(e.target.value)}
                placeholder="Type your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {typedName && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-2">Choose a signature style:</p>
                  {signatureStyles.map((style, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedStyle(index)}
                      className={`p-4 border-2 rounded-md cursor-pointer transition-colors ${
                        selectedStyle === index
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <p className="text-3xl" style={{ fontFamily: style.font }}>
                        {typedName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{style.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Draw */}
          {activeTab === 'draw' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">
                  Sign your name using your mouse or touchpad
                </p>
                
              </div>
              <div className="border-2 border-gray-300 rounded-md bg-white">
                <div className='flex justify-end'>
                    <button
                    onClick={clearCanvas}
                    className="text-blue-600 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 cursor-pointer"
                    >
                    <span className="text-xl"><CircleX /></span>
                    </button>
                </div>

                <canvas
                  ref={canvasRef}
                  width={600}
                  height={300}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full cursor-crosshair"
                />
              </div>
            </div>
          )}

          {/* Upload */}
          {activeTab === 'upload' && (
            <div>
              <p className="text-sm text-gray-600 mb-4">Upload your signature image</p>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                {uploadedImage ? (
                  <div>
                    <img src={uploadedImage} alt="Uploaded signature" className="max-h-48 mx-auto mb-4" />
                    <button onClick={() => setUploadedImage('')} className="text-blue-600 hover:underline">
                      Remove and upload another
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-4">📤</div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:underline">
                      Click to upload image
                    </label>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Camera */}
          {activeTab === 'camera' && (
            <div>
              <p className="text-sm text-gray-600 mb-4">Take a photo of your signature</p>
              <div className="border-2 border-gray-300 rounded-md overflow-hidden">
                {capturedImage ? (
                  <div className="p-4 text-center">
                    <img src={capturedImage} alt="Captured signature" className="max-h-64 mx-auto mb-4" />
                    <button
                      onClick={() => {
                        setCapturedImage('');
                        startCamera();
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Retake photo
                    </button>
                  </div>
                ) : (
                  <div>
                    <video ref={videoRef} autoPlay playsInline className="w-full" />
                    <div className="p-4 text-center">
                      <button
                        onClick={capturePhoto}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                      >
                        Capture Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCloseModal}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSignature}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSignature;