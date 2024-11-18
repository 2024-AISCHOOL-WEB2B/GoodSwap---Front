// Carousel Component using react-slick for sliding images
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2500,
    cssEase: "linear",
  };
  return (
    <div
      style={{
        width: "740px",
        margin: "0 auto",
        height: "420px",
        marginBottom: "1px",
        overflow: "hidden",
      }}
    >
      <Slider {...settings}>
        {/* 슬라이드에 들어갈 이미지나 내용을 이곳에 추가하세요. */}
        {[
          "https://6.soompi.io/wp-content/uploads/image/20240718000315_2024-MAMA-Awards.jpg?s=900x600&e=t",
          "https://newsimg.sedaily.com/2022/01/20/260XS4P40H_1.jpg",
          "https://img1.newsis.com/2023/02/23/NISI20230223_0001202789_web.jpg",
          "https://img.hankyung.com/photo/202406/AKR20240625045000005_01_i_P4.jpg",
        ].map((src) => (
          <div key={src}>
            <img
              src={src} // 이 부분을 실제 이미지 경로로 변경하세요
              alt="Slide 1"
              style={{ width: "100%", height: "400px", objectFit: "contain" }}
            />
          </div>
        ))}
        {/* <div>
          <img
            src="https://img.hankyung.com/photo/202406/AKR20240625045000005_01_i_P4.jpg" // 이 부분을 실제 이미지 경로로 변경하세요
            alt="Slide 1"
            height={400}
            style={{ width: "100%", objectFit: "fill" }}
          />
        </div>

        <div>
          <img
            src="https://newsimg.sedaily.com/2022/01/20/260XS4P40H_1.jpg" // 이 부분을 실제 이미지 경로로 변경하세요
            alt="Slide 1"
            style={{ width: "100%", height: "100%", objectFit: "fill" }}
          />
        </div>

        <div>
          <img
            src="https://img1.newsis.com/2023/02/23/NISI20230223_0001202789_web.jpg" // 이 부분을 실제 이미지 경로로 변경하세요
            alt="Slide 1"
            style={{ width: "100%", height: "100%", objectFit: "fill" }}
          />
        </div>

        <div>
          <img
            src="https://6.soompi.io/wp-content/uploads/image/20240718000315_2024-MAMA-Awards.jpg?s=900x600&e=t" // 이 부분을 실제 이미지 경로로 변경하세요
            alt="Slide 1"
            style={{ width: "100%", height: "100%", objectFit: "fill" }}
          />
        </div> */}
      </Slider>
    </div>
  );
};
export default Carousel;
