import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";
import axiosInstance from "@/utils/axios-client";
import { Budget } from "../../types/budgets.types";

interface AddBudgetResponse {
  budget: Budget;
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  totalSpentPercentage: number;
}

const addNewBudget = async ({
  category,
  budgetAmount,
}: {
  category: string;
  budgetAmount: number;
}): Promise<ApiResponseData<AddBudgetResponse>> => {
  try {
    const response = await axiosInstance.post<
      ApiResponseData<AddBudgetResponse>
    >(
      `/budget/new`,
      {
        category,
        budgetAmount,
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

export default addNewBudget;
