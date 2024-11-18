// GoodsList Component to display goods in a swipe-to-slide layout
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const GoodsNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        right: "-25px",
        zIndex: 2,
        cursor: "pointer",
        color: '#ff69b4',
      }}
      onClick={onClick}
    >
      <FaArrowRight size={24} />
    </div>
  );
};

const GoodsPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "-25px",
        zIndex: 2,
        cursor: "pointer",
        color: '#ff69b4',
      }}
      onClick={onClick}
    >
      <FaArrowLeft size={24} />
    </div>
  );
};

export const GoodsList: React.FC = () => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <GoodsNextArrow />, 
    prevArrow: <GoodsPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const goods = [
    {
      id: 1,
      name: "[Mantra] Oversized T-shirts (White)",
      imageUrl: "https://campaigns.weverse.io/_next/image?url=https%3A%2F%2Fcdn-contents.weverseshop.io%2Fpublic%2Fshop%2F5a2c732837274b9e7e63ca3028f83600.png&w=3840&q=75",
      artist: "Jennie",
      price: "₩12,000"
    },
    {
      id: 2,
      name: "NJ Supernatural FAN",
      imageUrl: "https://cdn-contents.weverseshop.io/public/shop/9c9fa9a74fb7f9df3dc8dd3fb381ca4b.png",
      artist: "NewJeans",
      price: "₩15,000"
    },
    {
      id: 3,
      name: "OFFICIAL LIGHT STICK ver.2",
      imageUrl: "https://cdn-contents.weverseshop.io/public/shop/c0bb0cade706c6aa6e1f830d047924a0.png?q=95&w=720",
      artist: "BlackPink",
      price: "₩10,000"
    },
    {
      id: 4,
      name: "The Game Photocard Collection Back To Retro",
      imageUrl: "https://cdn-contents.weverseshop.io/public/shop/4e9c32c7066d6b023318063c443c8191.png?q=95&w=720",
      artist: "BlackPink",
      price: "₩8,000"
    },
  ];

  const handleGoodsClick = (goodId: number) => {
    navigate(`/goods/${goodId}`); // 상품 클릭 시 해당 상품의 상세 페이지로 이동
  };

  const handleViewAllClick = () => {
    navigate(`/goods`); // 전체 상품 보기 페이지로 이동
  };

  return (
    
    <div style={{ margin: '20px auto', width: "700px" }}>
      <h2 
  style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#ff69b4', cursor: 'pointer' }} 
  onClick={handleViewAllClick} // 클릭 이벤트 추가
>
  Goods
</h2>
      <Slider {...settings}>
        {goods.map((good) => (
          <div key={good.id} style={{ padding: '10px' }} onClick={() => handleGoodsClick(good.id)}>
            <div
              style={{
                border: '1px solid #ccc',
                padding: '20px',
                textAlign: 'center',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
            >
              <img
                src={good.imageUrl}
                alt={good.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '10px' }}
              />
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>{good.artist}</p> {/* 아티스트 이름 */}
              <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px',whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis' }}>{good.name}</p> {/* 상품명 */}
              <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold' }}>{good.price}</p> {/* 가격 */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default GoodsList;