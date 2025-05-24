import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Wallet } from "lucide-react";

const CurrentBalanceCard = () => {
  return (
    <Card className="bg-teal-700 text-white border-0 shadow-md gap-1">
      <CardHeader className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-2">
          <Wallet className="h-8 w-8" />
          <div className="flex flex-col">
            <CardTitle className="text-lg font-medium">
              Current Balance
            </CardTitle>
            <CardDescription>
              <div className="opacity-80 text-white">
                <span>Last updated: Today, 2:30 PM</span>
              </div>
            </CardDescription>
          </div>
        </div>
        <div className="text-3xl font-bold">$24,580.42</div>
      </CardHeader>
    </Card>
  );
};

export default CurrentBalanceCard;
