import { Transaction } from "../../types/transactions.types";
import axiosInstance from "@/utils/axios-client";
import { errorHandler } from "@/utils/error-handler";
import { ApiResponseData } from "@/types/api-response";

const getAllTransactions = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): Promise<ApiResponseData<Transaction[]>> => {
  try {
    const response = await axiosInstance.get<ApiResponseData<Transaction[]>>(
      `/transaction/all?page=${page}&limit=${limit}`
    );

    return response?.data;
  } catch (err: unknown) {
    return errorHandler(err);
  }
};

export default getAllTransactions;
