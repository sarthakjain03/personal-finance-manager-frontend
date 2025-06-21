import axios from "axios";
import login from "./user-login";

const getGoogleUser = async (accessToken: string, expiresIn: number) => {
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
    });

    if (!userLogin.success) {
      return userLogin;
    }

    const userDetails = {
      name: response?.data?.names[0]?.displayName,
      email: response?.data?.emailAddresses[0]?.value,
      photoUrl: response?.data?.photos[0]?.url,
    };

    return {
      success: true,
      ...userDetails,
    };
  } catch (err: unknown) {
    console.error(err);
    const error = err as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};

export default getGoogleUser;
