const formatCurrency = (
  value: number | undefined | null,
  currency: string = "INR"
) => {
  const amount = value ? parseFloat(value.toFixed(2)) : 0;

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);

  return formatted;
};

export default formatCurrency;
