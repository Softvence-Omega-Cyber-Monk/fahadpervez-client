import React from 'react';
import { Order } from '../data';

interface StepperProps {
  timeline: Order['timeline'];
}

const Stepper: React.FC<StepperProps> = ({ timeline }) => {
  const currentStepIndex = timeline.findIndex(t => t.status === 'active');
  const progressWidth = currentStepIndex >= 0 ?
    ((currentStepIndex + 0.5) / timeline.length) * 100 : 33;

  return (
    <div className="relative py-8">
      {/* Progress line */}
      <div className="absolute top-16 left-8 right-8 h-1 bg-gray-200 rounded-full hidden md:block">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeline.map((item) => {
          const isComplete = item.status === 'complete';
          const isActive = item.status === 'active';
          const isPending = item.status === 'pending';

          return (
            <div key={item.step} className="flex flex-col items-center text-center p-3">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-3 relative z-10
                ${isComplete ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : ''}
                ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50' : ''}
                ${isPending ? 'bg-gray-200 text-gray-500' : ''}
              `}>
                {isComplete ? (
                  <span className="text-lg font-bold">✓</span>
                ) : isActive ? (
                  <span className="text-lg">📦</span>
                ) : (
                  <span className="text-lg">•</span>
                )}
              </div>

              <div className="space-y-1">
                <p className={`
                  text-sm font-semibold
                  ${isComplete ? 'text-blue-700' : ''}
                  ${isActive ? 'text-orange-600' : ''}
                  ${isPending ? 'text-gray-500' : ''}
                `}>
                  {item.step}
                </p>
                <p className="text-xs text-gray-600 font-medium">
                  {item.time || item.estimate}
                </p>
                <p className="text-xs text-gray-500">
                  {item.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
