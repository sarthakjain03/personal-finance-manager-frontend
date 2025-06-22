import axios from "axios";
import { axiosBaseUrl } from "@/lib/env";

const login = async ({
  email,
  accessToken,
  expiresIn,
  name,
  profilePhotoUrl,
}: {
  email: string;
  accessToken: string;
  expiresIn: number;
  name: string;
  profilePhotoUrl: string;
}) => {
  try {
    const response = await axios.post(
      `${axiosBaseUrl}/auth/login`,
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
    console.error(err);
    const error = err as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};

export default login;
