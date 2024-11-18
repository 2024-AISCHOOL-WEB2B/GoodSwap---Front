// GoodsDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type GoodsDetailProps = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export const GoodsDetailPage: React.FC = () => {
  const { goodId } = useParams<{ goodId: string }>();
  const [good, setGood] = useState<GoodsDetailProps | null>(null);

  useEffect(() => {
    // 백엔드 API를 통해 상품 데이터를 가져옵니다.
    axios.get(`/api/goods/${goodId}`)
      .then(response => {
        setGood(response.data);
      })
      .catch(error => {
        console.error("Error fetching goods detail:", error);
      });
  }, [goodId]);

  if (!good) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin: '20px auto', width: '764px', textAlign: 'center' }}>
      <img src={good.imageUrl} alt={good.name} style={{ width: '100%', height: 'auto' }} />
      <h2>{good.name}</h2>
      <p>{good.description}</p>
    </div>
  );
};
export default GoodsDetailPage;
