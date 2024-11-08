import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor: React.FC = () => {
  const editorRef = useRef<ReactQuill | null>(null);

  const handleContentChange = (content: string) => {
    console.log('Editor content:', content);
  };

  return (
    <div
      className="quill-editor"
      style={{
        width: '666px', // 에디터 너비 고정
        height: '587px', // 전체 높이 고정
        border: '1px solid #ddd', // 테두리 색상 및 두께 조정
        borderRadius: '5px', // 둥근 테두리
        overflow: 'hidden', // 외부 테두리가 넘치지 않도록 설정
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ReactQuill
        ref={editorRef}
        theme="snow"
        onChange={handleContentChange}
        placeholder="내용을 입력하세요..."
        modules={{
          toolbar: [
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
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
        style={{
          flexGrow: 1, // 에디터가 컨테이너 전체를 차지하도록 설정
          minHeight: '300px', // 최소 높이 설정
          maxHeight: '587px', // 최대 높이 설정
          overflowY: 'auto', // 내용이 넘칠 때만 스크롤 활성화
        }}
      />
    </div>
  );
};

export default QuillEditor;
