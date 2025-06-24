import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";
import axiosInstance from "@/utils/axios-client";
import { Budget } from "../../types/budgets.types";

interface AddEditBudgetResponse {
  budget: Budget;
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  totalSpentPercentage: number;
}

const addOrEditBudget = async ({
  category,
  budgetAmount,
  reqType,
  budgetId,
}: {
  category: string;
  budgetAmount: number;
  reqType: "new" | "edit";
  budgetId?: string;
}): Promise<ApiResponseData<AddEditBudgetResponse>> => {
  try {
    if (reqType === "edit") {
      const response = await axiosInstance.patch<
        ApiResponseData<AddEditBudgetResponse>
      >(
        `/budget/edit/${budgetId}`,
        {
          category,
          budgetAmount,
        },
        {
          withCredentials: true,
        }
      );

      return response?.data;
    } else {
      const response = await axiosInstance.post<
        ApiResponseData<AddEditBudgetResponse>
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
    }
  } catch (err: unknown) {
    return errorHandler(err);
  }
};

export default addOrEditBudget;
