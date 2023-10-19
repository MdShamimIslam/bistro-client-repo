import { useContext } from "react";
import { authContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const useAxiosSecure = () => {
  const { logOut } = useContext(authContext);
  const navigate = useNavigate();

  // step-1
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
  });

  // step-2
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // step-2.1
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          (error.response && error.response.status === 401) ||
          error.response.status === 403
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosSecure]);

  // step-3
  return [axiosSecure];
};

export default useAxiosSecure;
