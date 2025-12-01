import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CandidateDetail, CandidateList, NotFound } from "@/pages";

export const PagesRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CandidateList />} />
        <Route path="/candidate/:id" element={<CandidateDetail />} />

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
