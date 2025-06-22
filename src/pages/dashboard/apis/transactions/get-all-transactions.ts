import { Transaction } from "../../types/transactions.types";
import axiosInstance from "@/utils/axios-client";
import { errorHandler } from "@/utils/error-handler";
import { ApiResponseData } from "@/types/api-response";

const getAllTransactions = async () => {
  try {
    const response = await axiosInstance.get("/transaction/all");
  } catch (err: unknown) {
    return errorHandler(err);
  }
};
