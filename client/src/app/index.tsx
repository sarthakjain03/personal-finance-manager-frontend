import AppProvider from "./provider";
import AppRouter from "./router";

const App = () => {
  return (
    <div className="py-4 px-6 md:px-12 bg-[#FFFDF6]">
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </div>
  );
};

export default App;
