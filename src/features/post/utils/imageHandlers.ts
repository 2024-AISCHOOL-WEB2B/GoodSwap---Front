import { Quill } from 'react-quill';

export const handleImage = async (editor: typeof Quill.prototype) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;

    // 로컬 미리보기 URL 생성
    const localImageUrl = URL.createObjectURL(file);
    const range = editor.getSelection();

    if (range && typeof range.index === 'number') {
      // 로컬 이미지 삽입 시 'img' 태그를 사용하여 삽입
      editor.clipboard.dangerouslyPasteHTML(
        range.index,
        `<img src="${localImageUrl}" alt="미리보기 이미지" style="max-width: 100%; height: auto;" />`
      );
      editor.setSelection({ index: range.index + 1, length: 0 });

      // 서버 업로드 로직 (테스트 코드)
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('http://localhost:8080/api/upload', {
          method: 'POST',
          body: formData,
          mode: 'cors',
        });

        if (response.ok) {
          const data = await response.json();
          const serverImageUrl = data.url;

          // 서버 URL로 이미지 교체
          editor.deleteText(range.index, 1);
          editor.clipboard.dangerouslyPasteHTML(
            range.index,
            `<img src="${serverImageUrl}" alt="업로드된 이미지" style="max-width: 100%; height: auto;" />`
          );
          editor.setSelection({ index: range.index + 1, length: 0 });
        } else {
          console.error('이미지 업로드 실패:', response.statusText);
        }
      } catch (error) {
        console.error('이미지 업로드 오류:', error);
      } finally {
        URL.revokeObjectURL(localImageUrl);
      }
    } else {
      console.error('Range 정보가 없습니다.');
    }
  };
};
