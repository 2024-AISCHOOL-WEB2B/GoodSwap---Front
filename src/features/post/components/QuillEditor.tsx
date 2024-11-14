import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  className?: string;
}

const QuillEditor = forwardRef<ReactQuill, QuillEditorProps>(({ className }, ref) => {
  const editorRef = useRef<ReactQuill>(null);

  // ref를 안전하게 설정
  useImperativeHandle(ref, () => editorRef.current as ReactQuill);

  const handleContentChange = (content: string) => {
    console.log('Editor content:', content);
  };

  // 이미지 삽입 함수
  const insertImage = (imageUrl: string) => {
    const quillEditor = editorRef.current?.getEditor();
    if (quillEditor) {
      const range = quillEditor.getSelection();
      // RangeStatic 타입으로 수정
      if (range && typeof range.index === 'number') {
        quillEditor.insertEmbed(range.index, 'image', imageUrl);
        quillEditor.setSelection({ index: range.index + 1, length: 0 });
      }
    }
  };

  // 커스텀 이미지 핸들러 함수
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        // 로컬 미리보기 URL 생성
        const localImageUrl = URL.createObjectURL(file);
        insertImage(localImageUrl);

        try {
          // 서버로 이미지 업로드
          const formData = new FormData();
          formData.append('image', file);

          const response = await fetch('http://localhost:8080/api/upload', {
            method: 'POST',
            body: formData,
            mode: 'cors',
          });

          if (response.ok) {
            const data = await response.json();
            const serverImageUrl = data.url;

            // 서버에서 URL을 받으면 로컬 URL을 서버 URL로 교체
            const quillEditor = editorRef.current?.getEditor();
            if (quillEditor) {
              const range = quillEditor.getSelection();
              if (range && typeof range.index === 'number') {
                quillEditor.deleteText(range.index - 1, 1);
                insertImage(serverImageUrl);
                quillEditor.setSelection({ index: range.index + 1, length: 0 });
              }
            }
          } else {
            console.error('이미지 업로드 실패:', response.statusText);
          }
        } catch (error) {
          console.error('이미지 업로드 중 오류 발생:', error);
        } finally {
          // 메모리 해제
          URL.revokeObjectURL(localImageUrl);
        }
      }
    };
  };

  return (
    <div className={`w-[666px] border border-gray-300 rounded-lg overflow-hidden flex flex-col ${className}`}>
      <ReactQuill
        ref={editorRef}
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

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
