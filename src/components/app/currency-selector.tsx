import useUserStore from "@/store/user-store";
import { useEffect, useState } from "react";
import updateCurrencyFormat from "@/api/user/update-currency-format";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currencyFlags = {
  USD: "🇺🇸",
  EUR: "🇩🇪",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  CNY: "🇨🇳",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
  CHF: "🇨🇭",
  INR: "🇮🇳",
  KRW: "🇰🇷",
};

const CurrencySelector = () => {
  const { user, setUser } = useUserStore();
  const [currency, setCurrency] = useState(user?.currencyFormat || "INR");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setCurrency(user?.currencyFormat || "INR");
  }, [user]);

  const handleCurrencyChange = async (value: string) => {
    if (user) {
      setUpdating(true);
      const response = await updateCurrencyFormat(value);
      if (response.success) {
        setUser({ ...user, currencyFormat: value });
        setCurrency(value);
      } else if (response?.message) {
        toast.error(response.message);
      }
      setUpdating(false);
    }
  };

  return (
    <Select
      value={currency}
      onValueChange={handleCurrencyChange}
      disabled={updating}
    >
      <SelectTrigger className="w-full cursor-pointer bg-white/80 border border-gray-400">
        <SelectValue placeholder="Currency Format" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(currencyFlags).map((currency) => (
          <SelectItem
            key={currency}
            value={currency}
            className="flex items-center gap-2"
          >
            <span>{currencyFlags[currency]}</span>
            <span>{currency}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
