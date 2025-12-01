import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CandidateProvider } from "./context/CandidateContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CandidateProvider>
      <App />
    </CandidateProvider>
  </StrictMode>
);
