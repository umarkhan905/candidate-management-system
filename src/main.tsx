import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CandidateProvider } from "./context/CandidateContext.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";
import { ErrorPage } from "./pages/ErrorPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <CandidateProvider>
        <App />
      </CandidateProvider>
    </ErrorBoundary>
  </StrictMode>
);
