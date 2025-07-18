import { User } from "@/types/user";

const currencyLocales = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  JPY: "ja-JP",
  CNY: "zh-CN",
  CAD: "en-CA",
  AUD: "en-AU",
  CHF: "de-CH",
  INR: "en-IN",
  KRW: "ko-KR",
};

const formatCurrency = (
  value: number | undefined | null,
  user: User | null
) => {
  const currency = user?.currencyFormat || "INR";
  const amount = value ? parseFloat(value.toFixed(2)) : 0;

  const formatted = new Intl.NumberFormat(currencyLocales[currency], {
    style: "currency",
    currency: currency,
  }).format(amount);

  return formatted;
};

export default formatCurrency;

// TODO: Use capacitor to make it into a mobile app.
