import { AxiosError } from "axios";

export const errorHandler = (error: unknown) => {
  let errorMessage: string;

  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError;
    const responseData = error?.response?.data;
    if (
      responseData &&
      typeof responseData === "object" &&
      "message" in responseData
    ) {
      errorMessage =
        (responseData as { message?: string }).message ?? axiosError.message;
    } else {
      errorMessage = error.message;
    }
  } else {
    const genericError = error as Error;
    errorMessage = genericError.message;
  }

  return {
    success: false,
    message: errorMessage,
  };
};
