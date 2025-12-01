import { CandidateInfo } from "@/components/candidate-detail/candidate-info";
import { CandidateInfoSheet } from "@/components/candidate-detail/candidate-info/CandidateInfoSheet";
import { CandidateResume } from "@/components/candidate-detail/candidate-resume";
import { RemarksWidget } from "@/components/candidate-detail/remarks-widget";
import { Button } from "@/components/ui/button";
import { useCandidates } from "@/context/CandidateContext";
import type { Candidate } from "@/types/candidate";
import { ArrowLeft, FileText, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CandidateDetail = () => {
  const { state, service } = useCandidates();
  const { id } = useParams();
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCandidate = async (id: string) => {
      const candidate = await service.getCandidateById(id!);
      setCandidate(candidate);
    };

    getCandidate(id!);
  }, [id]);

  if (state.loading.type === "GET_BY_ID" && state.loading.active)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );

  if (!candidate) {
    return null;
  }

  return (
    <div className="bg-background h-screen">
      <div className="bg-card shadow-sm border-border border-b">
        <div className="flex justify-between items-center mx-auto px-4 sm:px-6 py-4 container">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="cursor-pointer"
          >
            <ArrowLeft className="mr-2 size-4" />
            <span className="hidden sm:block">Back to List</span>
          </Button>

          {/* Right Side - Candidate Info Sheet */}
          <CandidateInfoSheet candidate={candidate} />
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left side - Resume/Loom viewer */}
        <div className="flex-1 bg-muted/30 w-2/3 overflow-hidden">
          {/* Fallback display if candidate has no resume or no loom link */}
          {!candidate.resumeFile && !candidate.loomLink && (
            <div className="flex flex-col justify-center items-center gap-4 p-8 h-full">
              <FileText className="mx-auto w-16 h-16 text-muted-foreground" />
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-lg">No Resume or Video</h3>
                <p className="text-muted-foreground text-sm">
                  This candidate hasn't a resume or Loom video yet
                </p>
              </div>
            </div>
          )}

          {candidate.resumeFile && <CandidateResume candidate={candidate} />}
        </div>
        {/* Right Side - Candidate Info */}
        <div className="hidden lg:block w-1/3">
          <CandidateInfo candidate={candidate} />
        </div>
      </div>

      {/* Remarks Widget */}
      <RemarksWidget candidate={candidate} />
    </div>
  );
};

export default CandidateDetail;
