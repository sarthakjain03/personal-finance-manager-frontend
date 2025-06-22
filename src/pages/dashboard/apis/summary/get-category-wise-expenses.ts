import axiosInstance from "@/utils/axios-client";
import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";
import { CategoryWiseExpensesData } from "../../types/summary.types";

const getCategoryWiseExpenses = async (
  timeline: "month" | "year"
): Promise<ApiResponseData<CategoryWiseExpensesData>> => {
  try {
    const response = await axiosInstance.get<
      ApiResponseData<CategoryWiseExpensesData>
    >(`/summary/category-wise-expenses?timeline=${timeline}`);

    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export default getCategoryWiseExpenses;
