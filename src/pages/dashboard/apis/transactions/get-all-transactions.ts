import { Transaction } from "../../types/transactions.types";
import axiosInstance from "@/utils/axios-client";

const getAllTransactions = async () => {
  try {
    const response = await axiosInstance.get("/transaction/all");
  } catch (err: unknown) {
    console.error(err);
    const error = err as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};
