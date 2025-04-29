import AppProvider from './provider';
import AppRouter from './router';

const App = () => {
  return (
    <AppProvider>
      <div className='mx-6 md:mx-12 bg-[#FFFAF4}'>
        <AppRouter />
      </div>
    </AppProvider>
  );
};

export default App;
