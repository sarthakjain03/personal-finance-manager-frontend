import axiosInstance from "@/utils/axios-client";
import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";

const deleteGoal = async (
  goalId: string
): Promise<ApiResponseData<undefined>> => {
  try {
    const response = await axiosInstance.delete<ApiResponseData<undefined>>(
      `/goal/delete/${goalId}`
    );

    return response?.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export default deleteGoal;
