import React, { useState, useRef } from "react";

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [imageFile, setImageFile] = useState<{
    imageFile: File | null;
    viewUrl: string;
  }>({
    imageFile: null,
    viewUrl: "",
  });
  const [loaded, setLoaded] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 이미지 업로드 핸들러
  const onChangeUploadHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (file) {
      // 로컬 미리보기 URL 생성
      const localImageUrl = URL.createObjectURL(file);
      setImageFile({
        imageFile: file,
        viewUrl: localImageUrl,
      });
      setLoaded(true);

      // 서버로 이미지 업로드
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("http://localhost:8080/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const serverImageUrl = data.url;

          // 서버 URL로 미리보기 업데이트
          setImageFile({
            imageFile: file,
            viewUrl: serverImageUrl,
          });

          // 부모 컴포넌트로 이미지 URL 전달
          onImageUpload(serverImageUrl);
        } else {
          console.error("이미지 업로드 실패:", response.statusText);
        }
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
      } finally {
        // 메모리 해제
        URL.revokeObjectURL(localImageUrl);
      }
    }
  };

  // 이미지 삭제 핸들러
  const onClickDeleteHandler = () => {
    setImageFile({ imageFile: null, viewUrl: "" });
    setLoaded(false);
    onImageUpload(""); // 이미지 삭제 시 빈 문자열 전달
  };

  // 업로드 버튼 클릭 핸들러
  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="image-upload"
        className="size-60 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer flex items-center justify-center overflow-hidden"
      >
        {loaded && imageFile.viewUrl ? (
          <img
            src={imageFile.viewUrl}
            alt="미리보기"
            className="size-full object-cover"
          />
        ) : (
          <span className="text-gray-500">상품 이미지 업로드</span>
        )}
      </label>
      <input
        id="image-upload"
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChangeUploadHandler}
        aria-label="이미지 파일 업로드"
        title="이미지 파일 선택"
      />
      {loaded && (
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={onClickDeleteHandler}
        >
          삭제
        </button>
      )}
    </div>
  );
};

export { ImageUploader };
