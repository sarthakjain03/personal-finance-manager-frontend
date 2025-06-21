import axiosInstance from "@/utils/axios-client";

const userLogout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");

    return response?.data;
  } catch (err: unknown) {
    console.error(err);
    const error = err as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};

export default userLogout;
