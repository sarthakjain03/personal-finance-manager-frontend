import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import useUserStore from "@/store/user-store";
import { Wallet } from "lucide-react";

const CurrentBalanceCard = () => {
  const { user } = useUserStore();

  const formatted = user?.currentBalance
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      })
        .format(user?.currentBalance)
        ?.split("₹")?.[1]
    : "0";

  return (
    <Card className="bg-teal-700 text-white border-0 shadow-md gap-1">
      <CardHeader className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-2 items-center">
          <Wallet className="h-8 w-8" />
          <CardTitle className="text-lg font-medium">Current Balance</CardTitle>
        </div>
        <div className="text-3xl font-bold">{formatted || 0}</div>
      </CardHeader>
    </Card>
  );
};

export default CurrentBalanceCard;
