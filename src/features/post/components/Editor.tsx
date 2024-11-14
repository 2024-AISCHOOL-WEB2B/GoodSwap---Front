import React, { useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { handleImage } from '../utils/imageHandlers';


//참고자료
//https://mingeesuh.tistory.com/entry/Quill-React-%EC%97%90%EB%94%94%ED%84%B0-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EC%82%AC%EC%9D%B4%EC%A6%88-%EC%A1%B0%EC%A0%88
//https://fordev-yunhwan.tistory.com/entry/quill-editor-%EB%82%B4%EB%B6%80%EC%9D%98-%EC%82%AC%EC%A7%84-%EC%84%9C%EB%B2%84%EB%A1%9C-%EB%B3%B4%EB%82%B4%EA%B8%B0



// 툴바 옵션 정의
const toolbarOptions = [
  ['link', 'image', 'video'],
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];


// 포맷 정의
const formats = [
  'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
  'align', 'blockquote', 'list', 'bullet', 'indent',
  'background', 'color', 'link', 'image', 'video', 'width',
];

// EditorProps 타입 정의
interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, placeholder, className }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const toolbar = editor.getModule('toolbar');
      toolbar.addHandler('image', () => handleImage(editor));
    }
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      theme="snow"
      modules={{
        toolbar: {
          container: toolbarOptions,
        },
      }}
      formats={formats}
    />
  );
};

export default Editor;
