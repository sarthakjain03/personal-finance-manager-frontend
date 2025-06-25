import axiosInstance from "@/utils/axios-client";
import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";
import { Goal } from "../../types/goals.types";

const getAllGoals = async (): Promise<ApiResponseData<Goal[]>> => {
  try {
    const response = await axiosInstance.get<ApiResponseData<Goal[]>>(
      `/goal/all`
    );

    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export default getAllGoals;
