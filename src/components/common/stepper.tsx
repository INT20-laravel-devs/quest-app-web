import React from 'react';

const Stepper = ({ currentStep = 2 }) => {
  const steps = [
    { number: '01', label: 'Quest' },
    { number: '02', label: 'Round' },
    { number: '03', label: 'Results' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="relative flex justify-between">
        <div className="absolute top-5 left-0 right-0 h-0.5">
          <div className="absolute h-full w-[95%] bg-gray-200 left-[2.5%]">
            <div
              className="absolute h-full bg-blue-500 transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        {steps.map((step, index) => {
          const isCompleted = index < currentStep - 1;
          const isCurrent = index === currentStep - 1;
          const isUpcoming = index > currentStep - 1;

          return (
            <div
              key={step.number}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-500
                  ${isCompleted ? 'bg-primary text-white' : ''}
                  ${isCurrent ? 'bg-primary text-white ring-4 ring-blue-100' : ''}
                  ${isUpcoming ? 'bg-gray-100 text-gray-400' : ''}
                `}
              >
                {step.number}
              </div>

              <div
                className={`
                  mt-3 text-sm font-medium
                  ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}
                `}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
