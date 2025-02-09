import { cn } from '@/utils/styles-utils';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

const FormStepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <div className="flex flex-col mx-auto gap-3 sm:gap-8 w-full max-w-3xl mb-8">
      <div className="flex items-center justify-between px-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div
              className={cn(
                'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 shrink-0',
                currentStep >= index + 1
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted text-muted-foreground',
              )}
            >
              <span className="text-sm sm:text-base font-medium">
                {index + 1}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-[2px] w-full mx-2 sm:mx-4',
                  currentStep > index + 1 ? 'bg-primary' : 'bg-muted',
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between px-4 text-sm">
        {steps.map((step, index) => (
          <span
            key={index}
            className={cn(
              'text-xs sm:text-sm',
              currentStep >= index + 1
                ? 'text-primary'
                : 'text-muted-foreground',
            )}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FormStepper;
