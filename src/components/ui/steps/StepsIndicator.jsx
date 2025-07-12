import { CheckCircle, HourglassMedium } from "phosphor-react";
import { Button } from "keep-react";
import { useAddEmployeeStore } from "../../../store/AddEmployeStore";

export default function StepsIndicator() {
  const { currentStep, getSteps } = useAddEmployeeStore();
  const steps = getSteps();

  return (
    <div className="2xl:flex justify-between items-center mb-8 hidden">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col gap-6 w-1/3">
          <div className="flex items-center w-full">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-lg ${
                  currentStep === step.id
                    ? "bg-primary text-white"
                    : "bg-[#F0F3F9]"
                }`}
              >
                {step.id}
              </div>
            </div>
            {index < steps.length - 0 && (
              <div
                className={`w-full mx-1 h-0.5 ${
                  currentStep === step.id ? "bg-primary" : "bg-[#F0F3F9]"
                }`}
              />
            )}
          </div>
          <div
            className={`border rounded-3xl w-[90%] p-6 shadow-sm h-[250px] ${
              currentStep === step.id
                ? "border-primary bg-[#DDE5FF]"
                : "border-gray-100 bg-transparent"
            }`}
          >
            <div className="flex gap-1 h-full">
              <div className="flex flex-col justify-between">
                <p className="text-black font-medium">{step.title}</p>
                {currentStep === step.id && (
                  <Button className="bg-primary hover:bg-primary/90">
                    Mulai Pengisian
                  </Button>
                )}
                {step.isComplete && (
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#C9EDDB]">
                      <div className="flex items-center justify-center h-full">
                        <CheckCircle
                          size={20}
                          weight="bold"
                          className="text-[#11A75C]"
                        />
                      </div>
                    </div>
                    <p className="text-[#8897AE] text-sm">Completed</p>
                  </div>
                )}
                {currentStep < step.id && !step.isComplete && (
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#FDEFD8]">
                      <div className="flex items-center justify-center h-full">
                        <HourglassMedium
                          size={20}
                          weight="bold"
                          className="text-[#D97706]"
                        />
                      </div>
                    </div>
                    <p className="text-[#8897AE] text-sm">In Progress</p>
                  </div>
                )}
              </div>
              <img
                src={step.image}
                alt={step.title}
                className="w-1/2 mx-auto h-auto object-cover object-center"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
