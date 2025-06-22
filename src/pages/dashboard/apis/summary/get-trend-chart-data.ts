import axiosInstance from "@/utils/axios-client";
import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";
import { TrendChartData } from "../../types/summary.types";

interface TrendChartParams {
  type: "income" | "expense";
  timeline: "month" | "year";
}

const getTrendChartData = async ({
  type,
  timeline,
}: TrendChartParams): Promise<ApiResponseData<TrendChartData>> => {
  try {
    const response = await axiosInstance.get<ApiResponseData<TrendChartData>>(
      `/summary/trend/${type}?timeline=${timeline}`
    );

    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export default getTrendChartData;
