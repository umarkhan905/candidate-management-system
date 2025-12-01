import { Toaster } from "sonner";
import { PagesRouter } from "./router";

const App = () => {
  return (
    <>
      <PagesRouter />

      {/* Toast Container for toast notifications */}
      <Toaster closeButton richColors duration={2000} />
    </>
  );
};

export default App;
