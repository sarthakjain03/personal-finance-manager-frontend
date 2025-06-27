import axiosInstance from "@/utils/axios-client";
import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";

interface ResponseI {
  currentBalance: number;
}

const deleteTransaction = async (
  transactionId: string
): Promise<ApiResponseData<ResponseI>> => {
  try {
    const response = await axiosInstance.delete<ApiResponseData<ResponseI>>(
      `/transaction/delete/${transactionId}`
    );

    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export default deleteTransaction;
