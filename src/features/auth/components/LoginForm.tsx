// src/features/auth/components/LoginForm.tsx

import React, { useState, useLayoutEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema, LoginSchema } from "../entities/UserSchema";
import { Modal } from "../../../widgets/Modal";
import { FormLayout } from "../../../widgets/FormLayout";
import { submitLoginForm } from "../utils/formHandlers";
import { EmailField } from "../shared/EmailField";
import { PasswordField } from "../shared/PasswordField";
import { loginAtom } from "../atoms/auth";
import { useSetAtom } from "jotai";

type LoginFormProps = {
  onLogin: (token: string) => void;
};

const LoginFormComponent: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const title = "덕업일치 계정을 로그인해주세요.";
  const navigate = useNavigate();
  const setLogin = useSetAtom(loginAtom);

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const resetForm = () => methods.reset();

  const onSubmit = async (data: LoginSchema) => {
    try {
      const accessToken = await submitLoginForm(data.email, data.password);
      if (accessToken) {
        onLogin(accessToken);
        setLogin(accessToken);
        navigate("/main");
      }
    } catch (error) {
      setErrorMessage(error as string);
      setShowModal(true);
      resetForm();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  useLayoutEffect(() => {
    document.documentElement.style.backgroundColor = "rgb(250, 250, 250)";
    document.body.style.backgroundColor = "rgb(250, 250, 250)";

    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <FormLayout title={title}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EmailField />
          <PasswordField name="password" />

          <SubmitButton />
          <ForgotPasswordText />
          <SignUpLink onClick={handleSignUpClick} />
        </form>

        {showModal && (
          <Modal isVisible={showModal} onClose={closeModal}>
            <h2 className="text-red-500 mb-4">로그인 실패</h2>
            <p>{errorMessage}</p>
          </Modal>
        )}
      </FormLayout>
    </FormProvider>
  );
};

const SubmitButton = () => (
  <button
    type="submit"
    className="w-full py-2 bg-gradient-to-r from-custom_magenta to-custom_appricot text-white font-semibold rounded"
  >
    로그인
  </button>
);

const ForgotPasswordText = () => (
  <p className="text-center mt-6">비밀번호를 잊어버리셨나요?</p>
);

const SignUpLink: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <p className="text-center mt-12">
    아직 계정이 없다면?{" "}
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="text-custom_magenta font-semibold"
    >
      덕업일치 계정으로 가입하기
    </a>
  </p>
);

export const LoginForm = React.memo(LoginFormComponent);
LoginForm.displayName = "LoginForm";
