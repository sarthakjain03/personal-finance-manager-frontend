import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";
import axiosInstance from "@/utils/axios-client";

interface LoginData {
  email: string;
  accessToken: string;
  expiresIn: number;
  name: string;
  profilePhotoUrl: string;
}

const login = async ({
  email,
  accessToken,
  expiresIn,
  name,
  profilePhotoUrl,
}: LoginData): Promise<ApiResponseData<{ currentBalance: number }>> => {
  try {
    const response = await axiosInstance.post<
      ApiResponseData<{ currentBalance: number }>
    >(
      `/auth/login`,
      {
        email,
        accessToken,
        expiresIn,
        name,
        profilePhotoUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    return response?.data;
  } catch (err: unknown) {
    return errorHandler(err);
  }
};

export default login;
