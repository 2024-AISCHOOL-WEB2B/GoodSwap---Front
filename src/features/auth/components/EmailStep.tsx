// // src/features/auth/components/EmailStep.tsx

// import React, { useState } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAtom } from "jotai";
// import { EmailField } from "../shared/EmailField";
// import { loginSchema } from "../entities/UserSchema";
// import { emailAtom } from "../atoms/auth";
// import { Modal } from "../../../widgets/Modal";
// import axios from "axios";

// // `EmailStep` 컴포넌트 타입 정의
// type EmailStepProps = {
//   onNext: () => void; // 다음 스텝으로 이동하는 콜백 함수
// };

// const EmailStep: React.FC<EmailStepProps> = ({ onNext }) => {
//   const [email, setEmail] = useAtom(emailAtom); // 이메일 상태 관리
//   const [showModal, setShowModal] = useState(false); // 모달 표시 상태
//   const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태

//   // React Hook Form과 Zod를 이용한 폼 설정 및 유효성 검사
//   const methods = useForm({
//     resolver: zodResolver(loginSchema.pick({ email: true })), // 이메일 필드에 대한 유효성 검사 설정
//     mode: "onChange",
//     defaultValues: { email }, // Atom에서 초기값 로드
//   });

//   const { handleSubmit } = methods;

//   // 폼 제출 및 이메일 중복 확인 함수
//   const onSubmit = async (data: { email: string }) => {
//     console.log("Submitting form with email:", data.email); // 확인용 로그
//     try {
//       const response = await axios.get(
//         "http://localhost:8081/auth/check-email",
//         {
//           params: { email: data.email },
//         }
//       );

//       if (response.status === 200) {
//         setEmail(data.email);
//         onNext(); // 중복이 없으면 다음 스텝으로 이동
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response?.status === 409) {
//         setErrorMessage("이미 사용 중인 이메일입니다.");
//         setShowModal(true);
//         methods.setValue("email", "");
//       } else {
//         setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
//         setShowModal(true);
//       }
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <EmailField enableLocalStorage={true} />
//         <button
//           type="submit"
//           className="w-full py-2 bg-gradient-to-r from-custom_magenta to-custom_appricot text-white font-semibold rounded"
//         >
//           다음
//         </button>
//         {showModal && (
//           <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
//             <p>{errorMessage}</p>
//           </Modal>
//         )}
//       </form>
//     </FormProvider>
//   );
// };

// export { EmailStep };
