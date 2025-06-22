import axiosInstance from "@/utils/axios-client";
import { MonthlyCardsData } from "../../types/summary.types";
import { AxiosError } from "axios";

const getMonthlyCardsData = async () => {
  try {
    const response = await axiosInstance.get("/summary/monthly-cards");

    if (response?.data?.success) {
      return {
        success: true,
        data: response?.data?.data as MonthlyCardsData,
      };
    }

    return response?.data;
  } catch (err: unknown) {
    // console.error(err);
    const error = err as AxiosError;
    let errorMessage: string | undefined;
    const responseData = error?.response?.data;
    if (
      responseData &&
      typeof responseData === "object" &&
      "message" in responseData
    ) {
      errorMessage = (responseData as { message?: string }).message;
    }
    return {
      success: false,
      message: errorMessage ?? error.message,
    };
  }
};

export default getMonthlyCardsData;
