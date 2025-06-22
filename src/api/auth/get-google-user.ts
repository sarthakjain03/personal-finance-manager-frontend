import axios from "axios";
import login from "./user-login";
import { errorHandler } from "@/utils/error-handler";

interface UserData {
  success: boolean;
  message: string;
  name?: string;
  email?: string;
  photoUrl?: string;
  currentBalance?: number;
}

const getGoogleUser = async (
  accessToken: string,
  expiresIn: number
): Promise<UserData> => {
  try {
    const response = await axios.get(
      `https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userLogin = await login({
      email: response?.data?.emailAddresses[0]?.value,
      accessToken,
      expiresIn,
      name: response?.data?.names[0]?.displayName,
      profilePhotoUrl: response?.data?.photos[0]?.url,
    });

    if (!userLogin?.success) {
      return userLogin;
    }

    const userDetails = {
      success: true,
      message: userLogin?.message,
      name: response?.data?.names[0]?.displayName,
      email: response?.data?.emailAddresses[0]?.value,
      photoUrl: response?.data?.photos[0]?.url,
      currentBalance: userLogin?.data?.currentBalance,
    };

    return userDetails;
  } catch (err: unknown) {
    return errorHandler(err);
  }
};

export default getGoogleUser;
