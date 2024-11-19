import axios from "axios";

// API URL 설정 (기본 URL)
const BASE_URL = "http://localhost:8081/api";

// 게시글 목록을 가져오는 함수
export const fetchPosts = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 게시글 상세 정보를 가져오는 함수
export const fetchPostById = async (postId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("게시글 상세 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 새로운 게시글을 생성하는 함수
export const createPost = async (postData: {
  artist: string;
  category: string;
  title: string;
  content: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error("게시글 생성 중 오류 발생:", error);
    throw error;
  }
};

// 게시글 수정 함수 (옵션)
export const updatePost = async (postId: number, updateData: object) => {
  try {
    const response = await axios.put(`${BASE_URL}/posts/${postId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("게시글 수정 중 오류 발생:", error);
    throw error;
  }
};

// 게시글 삭제 함수 (옵션)
export const deletePost = async (postId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 중 오류 발생:", error);
    throw error;
  }
};
