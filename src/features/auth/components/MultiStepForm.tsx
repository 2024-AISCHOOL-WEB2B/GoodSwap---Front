// src/features/auth/components/MultiStepForm.tsx

import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { emailAtom, passwordAtom, usernameAtom } from "../atoms/auth";
import { EmailStep } from "./EmailStep";
import { PasswordStep } from "./PasswordStep";
import { UsernameStep } from "./UsernameStep";
import { FormLayout } from "../../../widgets/FormLayout";
import { submitRegistrationForm } from "../utils/formHandlers";

// 각 단계에 대한 타입 정의
type Step = "email" | "password" | "username";

// `MultiStepForm` 컴포넌트 정의
const MultiStepForm: React.FC = () => {
  // 로컬 스토리지에서 현재 스텝을 로드하거나 기본값 "email" 설정
  const savedStep = (localStorage.getItem("currentStep") as Step) || "email";
  const [currentStep, setCurrentStep] = useState<Step>(savedStep);

  // 각 단계별로 전역 상태에서 데이터를 불러옴
  const [email] = useAtom(emailAtom);
  const [password] = useAtom(passwordAtom);
  const [username] = useAtom(usernameAtom);

  const location = useLocation(); // 라우트 경로를 가져오는 훅
  const navigate = useNavigate();

  // 단계별 제목 설정
  const titleMap: Record<Step, string> = {
    email: "새로운 이메일 주소로 회원가입 해주세요",
    password: "새로운 비밀번호를 설정해주세요",
    username: "닉네임을 설정해주세요",
  };

  // 전체 배경색을 렌더링 전에 설정
  useLayoutEffect(() => {
    document.documentElement.style.backgroundColor = "rgb(250, 250, 250)";
    document.body.style.backgroundColor = "rgb(250, 250, 250)";

    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const unregister = () => {
      localStorage.removeItem("currentStep");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("username");
    };
    return () => {
      // 현재 경로가 `/signup`이 아닐 때에만 초기화
      if (!location.pathname.startsWith("/signup")) {
        unregister();
      }
    };
  }, [location]);

  // 다음 스텝으로 이동하는 함수
  const goToNextStep = () => {
    const nextStep = currentStep === "email" ? "password" : "username";
    setCurrentStep(nextStep);
    localStorage.setItem("currentStep", nextStep);
  };

  // 이전 스텝으로 이동하는 함수
  const goToPreviousStep = () => {
    const prevStep = currentStep === "username" ? "password" : "email";
    setCurrentStep(prevStep);
    localStorage.setItem("currentStep", prevStep);
  };

  // 최종 제출 함수
  const handleFinalSubmit = async () => {
    const formData = { email, password, username };
    try {
      await submitRegistrationForm(
        formData,
        () => {
          console.log("회원가입 성공");
          navigate("/login"); // 회원가입 후 로그인 페이지로 이동
        },
        (errorMessage) => {
          console.error("회원가입 실패:", errorMessage);
        }
      );
    } catch (error) {
      console.error("회원가입 중 알 수 없는 오류 발생:", error);
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
          <UsernameStep
            onNext={handleFinalSubmit}
            onPrevious={goToPreviousStep}
          />
        );
      default:
        return null;
    }
  };

  return <FormLayout title={titleMap[currentStep]}>{renderStep()}</FormLayout>;
};

export { MultiStepForm };
