import { Transaction } from "../../types/transactions.types";
import axiosInstance from "@/utils/axios-client";
import { errorHandler } from "@/utils/error-handler";
import { ApiResponseData } from "@/types/api-response";

const getAllTransactions = async ({
  limit,
  page,
  fromDate,
  toDate,
  search,
  category,
  type,
}: {
  limit: number;
  page: number;
  fromDate?: Date;
  toDate?: Date;
  search?: string;
  category?: string;
  type?: string;
}): Promise<ApiResponseData<Transaction[]>> => {
  try {
    const payload = {
      page,
      limit,
      fromDate,
      toDate,
      search,
      category,
      type,
    };

    const response = await axiosInstance.post<ApiResponseData<Transaction[]>>(
      `/transaction/all`,
      payload,
      {
        withCredentials: true,
      }
    );

    return response?.data;
  } catch (err: unknown) {
    return errorHandler(err);
  }
};

export default getAllTransactions;
