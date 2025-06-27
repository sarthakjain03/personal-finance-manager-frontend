import { ApiResponseData } from "@/types/api-response";
import { errorHandler } from "@/utils/error-handler";
import axiosInstance from "@/utils/axios-client";
import { Goal } from "../../types/goals.types";

const addOrEditGoal = async ({
  title,
  description,
  category,
  targetAmount,
  currentAmount,
  deadline,
  goalId,
  reqType,
}: {
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  reqType: "new" | "edit";
  goalId?: string;
}): Promise<ApiResponseData<Goal>> => {
  try {
    if (reqType === "edit") {
      const response = await axiosInstance.patch<ApiResponseData<Goal>>(
        `/goal/edit/${goalId}`,
        {
          title,
          description,
          category,
          targetAmount,
          currentAmount,
          deadline: new Date(deadline),
        },
        {
          withCredentials: true,
        }
      );

      return response?.data;
    } else {
      const response = await axiosInstance.post<ApiResponseData<Goal>>(
        `/goal/new`,
        {
          title,
          description,
          category,
          targetAmount,
          currentAmount,
          deadline: new Date(deadline),
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

export default addOrEditGoal;
