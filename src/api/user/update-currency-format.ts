import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";
import axiosInstance from "@/utils/axios-client";

const updateCurrencyFormat = async (
  newCurrencyFormat: string
): Promise<ApiResponseData<undefined>> => {
  try {
    const response = await axiosInstance.post<ApiResponseData<undefined>>(
      `/user/update-currency-format`,
      {
        newCurrencyFormat,
      },
      {
        withCredentials: true,
      }
    );

    return response?.data;
  } catch (err: unknown) {
    return errorHandler(err);
  }
};

export default updateCurrencyFormat;
