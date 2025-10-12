import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  label: string;
}

interface ProgressBarProps {
  steps?: Step[];
  currentStep: number;
}

const Progressbar: React.FC<ProgressBarProps> = ({ steps = [], currentStep }) => {
  const totalSteps = steps.length > 1 ? steps.length - 1 : 1;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const newWidth = ((currentStep - 1) / totalSteps) * 100;
    const timeout = setTimeout(() => setWidth(newWidth), 50);
    return () => clearTimeout(timeout);
  }, [currentStep, totalSteps]);

  return (
    <div className="w-full mb-10 sm:mb-12">
      <div className="relative flex flex-wrap sm:flex-nowrap items-center justify-between sm:gap-0">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center z-10  justify-center"
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                currentStep > step.number
                  ? 'bg-blue-600 border-blue-600'
                  : currentStep === step.number
                  ? 'border-blue-600 bg-white'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {currentStep > step.number ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    currentStep === step.number ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {step.number}
                </span>
              )}
            </div>

            <div className="mt-2 text-center px-1 sm:px-2">
              <div className="text-[10px] sm:text-xs text-gray-500">Step {step.number}</div>
              <div
                className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.label}
              </div>
            </div>
          </div>
        ))}

        {/* Static Track */}
        <div
          className="absolute top-4 sm:top-5 left-0 right-0 h-0.5 bg-gray-300"
          style={{ zIndex: 0 }}
        />

        {/* Active Progress Bar */}
        <div
          className="absolute top-4 sm:top-5 left-0 h-0.5 bg-blue-600 transition-all duration-500 ease-in-out"
          style={{
            width: `${width}%`,
            zIndex: 0,
          }}
        />
      </div>
    </div>
  );
};

export default Progressbar;
