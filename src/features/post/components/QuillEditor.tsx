import React, { useRef, forwardRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  className?: string;
}

const QuillEditor = forwardRef<ReactQuill, QuillEditorProps>(({ className }, ref) => {
  const editor = useRef<ReactQuill>(null);

  // forwardRef로 전달된 ref를 ReactQuill 인스턴스로 설정
  React.useImperativeHandle(ref, () => editor.current as ReactQuill);

  const handleContentChange = (content: string) => {
    console.log('Editor content:', content);
  };

  // 커스텀 이미지 핸들러 함수
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await fetch('http://localhost:8080/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            const imageUrl = data.url;

            // 에디터에 이미지 URL 삽입
            const quillEditor = editor.current?.getEditor();
            const range = quillEditor?.getSelection();
            quillEditor?.insertEmbed(range?.index ?? 0, 'image', imageUrl);
          } else {
            console.error('이미지 업로드 실패:', response.statusText);
          }
        } catch (error) {
          console.error('이미지 업로드 중 오류 발생:', error);
        }
      }
    };
  };

  return (
    <div className={`w-[666px] border border-gray-300 rounded-lg overflow-hidden flex flex-col ${className}`}>
      <ReactQuill
        ref={editor}
        theme="snow"
        onChange={handleContentChange}
        placeholder="내용을 입력하세요..."
        modules={{
          toolbar: {
            container: [
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }, { background: [] }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
            handlers: {
              image: imageHandler,
            },
          },
        }}
        formats={[
          'header',
          'font',
          'size',
          'list',
          'bullet',
          'bold',
          'italic',
          'underline',
          'strike',
          'color',
          'background',
          'link',
          'image',
          'video',
        ]}
        className="flex-grow min-h-[300px] overflow-y-auto"
      />
    </div>
  );
});

// displayName 설정
QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
