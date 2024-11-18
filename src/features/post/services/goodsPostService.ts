import axios from "axios";

// API URL 설정 (기본 URL)
const BASE_URL = "http://localhost:8081/api";

// 굿즈 게시글 목록을 가져오는 함수
export const fetchGoodsPosts = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/goods-posts`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("굿즈 게시글 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 특정 굿즈 게시글 상세 정보를 가져오는 함수
export const fetchGoodsPostById = async (goodsPostId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/goods-posts/${goodsPostId}`);
    return response.data;
  } catch (error) {
    console.error("굿즈 게시글 상세 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 새로운 굿즈 게시글을 생성하는 함수
export const createGoodsPost = async (goodsPostData: {
  artist: string;
  category: string;
  title: string;
  content: string;
  imageUrl?: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/goods-posts`, goodsPostData);
    return response.data;
  } catch (error) {
    console.error("굿즈 게시글 생성 중 오류 발생:", error);
    throw error;
  }
};

// 굿즈 게시글 수정 함수 (옵션)
export const updateGoodsPost = async (goodsPostId: number, updateData: object) => {
  try {
    const response = await axios.put(`${BASE_URL}/goods-posts/${goodsPostId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("굿즈 게시글 수정 중 오류 발생:", error);
    throw error;
  }
};

// 굿즈 게시글 삭제 함수 (옵션)
export const deleteGoodsPost = async (goodsPostId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/goods-posts/${goodsPostId}`);
    return response.data;
  } catch (error) {
    console.error("굿즈 게시글 삭제 중 오류 발생:", error);
    throw error;
  }
};
