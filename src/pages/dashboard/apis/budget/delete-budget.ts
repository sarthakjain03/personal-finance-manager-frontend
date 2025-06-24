import axiosInstance from "@/utils/axios-client";
import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";

interface DeleteBudgetResponse {
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  totalSpentPercentage: number;
}

const deleteBudget = async (
  budgetId: string
): Promise<ApiResponseData<DeleteBudgetResponse>> => {
  try {
    const response = await axiosInstance.delete<
      ApiResponseData<DeleteBudgetResponse>
    >(`/budget/delete/${budgetId}`);

    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export default deleteBudget;
