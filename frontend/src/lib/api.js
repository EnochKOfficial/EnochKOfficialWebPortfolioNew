import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BASE_URL}/api`;

const fetcher = async (path) => {
  const { data } = await axios.get(`${API}${path}`);
  return data;
};

export const getProfile = () => fetcher(`/profile`);
export const getProjects = () => fetcher(`/projects`);
export const getWriting = () => fetcher(`/writing`);
export const getEducation = () => fetcher(`/education`);

export const postContactMessage = async (payload) => {
  const { data } = await axios.post(`${API}/contact-messages`, payload);
  return data;
};