import axiosInstance from "@/utils/axios-client";
import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";
import { BudgetSummaryChartData } from "../../types/summary.types";

const getBudgetChartData = async (): Promise<
  ApiResponseData<BudgetSummaryChartData>
> => {
  try {
    const response = await axiosInstance.get<
      ApiResponseData<BudgetSummaryChartData>
    >(`/summary/budget`);

    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export default getBudgetChartData;
