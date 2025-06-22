import axiosInstance from "@/utils/axios-client";
import { MonthlyCardsData } from "../../types/summary.types";
import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";

const getMonthlyCardsData = async (): Promise<
  ApiResponseData<MonthlyCardsData>
> => {
  try {
    const response = await axiosInstance.get<ApiResponseData<MonthlyCardsData>>(
      "/summary/monthly-cards"
    );

    return response?.data;
  } catch (err: unknown) {
    return errorHandler(err);
  }
};

export default getMonthlyCardsData;
