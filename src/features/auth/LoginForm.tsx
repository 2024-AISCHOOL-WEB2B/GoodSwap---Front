// src/features/auth/LoginForm.tsx

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import axios from "axios";
import { useSessionStorage } from "../../shared/hooks/useSessionStorage";

interface LoginFormProps {
  onLogin: () => void;
}

const schema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .max(32, { message: "비밀번호는 최대 32자까지만 가능합니다." })
    .regex(/[a-zA-Z]/, "비밀번호에는 영문자가 포함되어야 합니다.")
    // .regex(/[0-9]/, "비밀번호에는 숫자가 포함되어야 합니다.")
    // .regex(/[\W_]/, "비밀번호에는 특수문자가 포함되어야 합니다."),
});

type LoginFormData = z.infer<typeof schema>;

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [storedEmail, setStoredEmail] = useSessionStorage("email", "");
  const [storedPassword, setStoredPassword] = useSessionStorage("password", "");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      if (storedEmail) setValue("email", storedEmail);
      if (storedPassword) setValue("password", storedPassword);
      isFirstRender.current = false;
    }
  }, [setValue, storedEmail, storedPassword]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setStoredEmail(email);
      setStoredPassword(password);
    }
  }, [email, password, setStoredEmail, setStoredPassword]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const sanitizedEmail = sanitizeHtml(data.email);
      const sanitizedPassword = sanitizeHtml(data.password);

      // Postman Mock 서버 URL로 변경
      const mockServerUrl = "https://616f2a32-3be4-47b2-b372-469546ae9e40.mock.pstmn.io";

      // 이메일 존재 여부 확인 (가상 로직)
      const emailResponse = await axios.post(`${mockServerUrl}/api/check-email`, {
        email: sanitizedEmail,
      });

      if (emailResponse.status !== 200) {
        throw new Error("존재하지 않는 계정입니다.");
      }

      // 비밀번호 확인
      const loginResponse = await axios.post(`${mockServerUrl}/api/login`, {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (loginResponse.status === 200) {
        setErrorMessage(null);
        setStoredEmail("");
        setStoredPassword("");
        onLogin();
        navigate("/main");
      } else {
        throw new Error("비밀번호가 틀렸습니다. 다시 확인해주세요.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error || "서버 오류가 발생했습니다.");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
      setShowModal(true);
      setStoredEmail("");
      setStoredPassword("");
      setValue("email", "");
      setValue("password", "");
    }
  };
  

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      <div
        className={`flex justify-center items-start mt-6 ${
          showModal ? "blur-md" : ""
        }`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[498px] h-[723px] border p-6 flex flex-col justify-center"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">
            덕업일치 계정으로 로그인해주세요.
          </h1>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">
              이메일
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full p-2 border"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message?.toString()}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm mb-2">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full p-2 border"
              placeholder="비밀번호"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message?.toString()}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold"
          >
            로그인
          </button>

          <p className="text-center mt-6">비밀번호를 잊어버리셨나요?</p>
          <p className="text-center mt-12">
            아직 계정이 없다면?{" "}
            <a href="#" className="text-pink-500 font-semibold">
              덕업일치 계정으로 가입하기
            </a>
          </p>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-red-500 mb-4">로그인 실패</h2>
            <p>{errorMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 py-2 px-4 bg-gray-800 text-white rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { LoginForm };
