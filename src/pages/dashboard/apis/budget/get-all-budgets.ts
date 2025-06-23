import axiosInstance from "@/utils/axios-client";
import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";
import { BudgetFetchResponse } from "../../types/budgets.types";

const getAllBudgets = async (): Promise<
  ApiResponseData<BudgetFetchResponse>
> => {
  try {
    const response = await axiosInstance.get<
      ApiResponseData<BudgetFetchResponse>
    >(`/budget/all`);

    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export default getAllBudgets;
