import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor: React.FC = () => {
  const editorRef = useRef<ReactQuill | null>(null);

  const handleContentChange = (content: string) => {
    console.log('Editor content:', content);
  };

  return (
    <div className="w-[666px] h-[587px] border border-gray-300 rounded-lg overflow-hidden flex flex-col">
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
        className="flex-grow min-h-[300px] max-h-[587px] overflow-y-auto"
      />
    </div>
  );
};

export default QuillEditor;
