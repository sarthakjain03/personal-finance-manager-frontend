import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    {
      id: "summary",
      label: "Summary",
      description: "Overview of your finances",
    },
    { id: "transactions", label: "Transactions", description: "Track your expenses and income" },
    { id: "goals", label: "Goals", description: "Financial objectives" },
    { id: "budgets", label: "Budgets", description: "Budget management" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-2">
      <div className="flex flex-wrap gap-2">
        {tabs?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 min-w-[200px] px-6 py-4 rounded-xl text-left transition-all duration-200 cursor-pointer",
              activeTab === tab.id
                ? "bg-[#0b3a4f] text-white shadow-lg transform scale-[1.02]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <div className="font-semibold text-lg">{tab.label}</div>
            <div
              className={cn(
                "text-sm",
                activeTab === tab.id ? "text-white/75" : "text-gray-500"
              )}
            >
              {tab.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
