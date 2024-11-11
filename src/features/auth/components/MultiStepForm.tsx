// src/features/auth/components/MultiStepForm.tsx

import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { emailAtom, passwordAtom, usernameAtom } from "../atoms/auth";
import { EmailStep } from "./EmailStep";
import { PasswordStep } from "./PasswordStep";
import { UsernameStep } from "./UsernameStep";
import { FormLayout } from "../../../widgets/FormLayout";
import { Modal } from "../../../widgets/Modal";

type Step = "email" | "password" | "username";

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [, setEmail] = useAtom(emailAtom);
  const [, setPassword] = useAtom(passwordAtom);
  const [, setUsername] = useAtom(usernameAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // 페이지 이탈 시 상태 초기화
  useEffect(() => {
    return () => {
      setEmail(null);
      setPassword(null);
      setUsername(null);
    };
  }, [location.pathname, setEmail, setPassword, setUsername]);

  const titleMap: Record<Step, string> = {
    email: "새로운 이메일 주소로 회원가입 해주세요",
    password: "새로운 비밀번호를 설정해주세요",
    username: "닉네임을 설정해주세요",
  };

  useLayoutEffect(() => {
    document.documentElement.style.backgroundColor = "rgb(250, 250, 250)";
    document.body.style.backgroundColor = "rgb(250, 250, 250)";

    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  const goToNextStep = () => {
    if (currentStep === "email") setCurrentStep("password");
    else if (currentStep === "password") setCurrentStep("username");
  };

  const goToPreviousStep = () => {
    if (currentStep === "password") setCurrentStep("email");
    else if (currentStep === "username") setCurrentStep("password");
  };

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
          <UsernameStep
            onPrevious={goToPreviousStep}
            onSuccess={() => setShowCompletionModal(true)} // 성공 시 모달 표시
          />
        );
    }
  };

  return (
    <FormLayout title={titleMap[currentStep]}>
      {renderStep()}
      {showCompletionModal && (
        <Modal
          isVisible={showCompletionModal}
          onClose={() => {
            setShowCompletionModal(false);
            navigate("/login"); // 모달 닫을 때 로그인 페이지로 이동
          }}
        >
          <p>회원가입이 완료되었습니다. 로그인 해주세요.</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 py-2 px-4 bg-gradient-to-r from-custom_magenta to-custom_appricot text-white rounded"
          >
            로그인 이동
          </button>
        </Modal>
      )}
    </FormLayout>
  );
};

export { MultiStepForm };
