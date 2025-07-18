import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";
import axiosInstance from "@/utils/axios-client";
import { Transaction } from "../../types/transactions.types";

interface ResponseI {
  currentBalance: number;
  transaction: Transaction;
}

const addOrEditTransaction = async ({
  description,
  category,
  amount,
  transactionType,
  date,
  txnId,
  reqType,
}: {
  description: string;
  category: string;
  amount: number;
  date: string;
  transactionType: "" | "Income" | "Expense";
  reqType: "new" | "edit";
  txnId?: string;
}): Promise<ApiResponseData<ResponseI>> => {
  try {
    if (reqType === "edit") {
      const response = await axiosInstance.patch<ApiResponseData<ResponseI>>(
        `/transaction/edit/${txnId}`,
        {
          description,
          transactionType,
          category,
          amount,
          date,
        },
        {
          withCredentials: true,
        }
      );

      return response?.data;
    } else {
      const response = await axiosInstance.post<ApiResponseData<ResponseI>>(
        `/transaction/new`,
        {
          description,
          category,
          amount,
          transactionType,
          date,
        },
        {
          withCredentials: true,
        }
      );

      return response?.data;
    }
  } catch (err: unknown) {
    return errorHandler(err);
  }
};

export default addOrEditTransaction;
