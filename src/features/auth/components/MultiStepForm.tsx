// src/features/auth/components/MultiStepForm.tsx

import React, { useState } from "react";
import { EmailStep } from "./EmailStep";
import { PasswordStep } from "./PasswordStep";
import { UsernameStep } from "./UsernameStep";

// 각 단계에 대한 타입 정의
type Step = "email" | "password" | "username";

// `MultiStepForm` 컴포넌트 정의
const MultiStepForm: React.FC = () => {
  // 현재 스텝 상태 관리
  const [currentStep, setCurrentStep] = useState<Step>("email");

  // 다음 스텝으로 이동하는 함수
  const goToNextStep = () => {
    if (currentStep === "email") {
      setCurrentStep("password");
    } else if (currentStep === "password") {
      setCurrentStep("username");
    }
  };

  // 이전 스텝으로 이동하는 함수
  const goToPreviousStep = () => {
    if (currentStep === "username") {
      setCurrentStep("password");
    } else if (currentStep === "password") {
      setCurrentStep("email");
    }
  };

  // 각 스텝 컴포넌트 렌더링
  const renderStep = () => {
    switch (currentStep) {
      case "email":
        return <EmailStep onNext={goToNextStep} />;
      case "password":
        return (
          <PasswordStep onNext={goToNextStep} onPrevious={goToPreviousStep} />
        );
      case "username":
        return (
          <UsernameStep onNext={goToNextStep} onPrevious={goToPreviousStep} />
        );
      default:
        return null;
    }
  };

  return <>{renderStep()}</>;
};

export { MultiStepForm };
