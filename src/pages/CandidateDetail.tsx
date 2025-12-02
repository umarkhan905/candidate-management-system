import { CandidateInfo } from "@/components/candidate-detail/candidate-info";
import { CandidateInfoSheet } from "@/components/candidate-detail/candidate-info/CandidateInfoSheet";
import { CandidateResume } from "@/components/candidate-detail/candidate-resume";
import { RemarksWidget } from "@/components/candidate-detail/remarks-widget";
import { Button } from "@/components/ui/button";
import { useCandidates } from "@/context/CandidateContext";
import type { Candidate } from "@/types/candidate";
import { ArrowLeft, File, FileText, Loader, VideoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoomPlayer } from "@/components/LoomPlayer";
import { toast } from "sonner";

const CandidateDetail = () => {
  const { state, service } = useCandidates();
  const { id } = useParams();
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCandidate = async (id: string) => {
      const candidate = await service.getCandidateById(id!);
      if (!candidate) {
        toast.error("Candidate not found with this id");
        navigate("/");
        return;
      }

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
        <div className="flex-1 bg-muted/30 p-4 w-2/3 overflow-hidden">
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

          {(candidate.resumeFile || candidate.loomLink) && (
            <Tabs
              defaultValue="candidate-resume"
              className="space-y-2 w-full h-full overflow-y-auto scrollbar-hide"
            >
              <TabsList className="p-1.5 rounded-full w-full h-auto">
                <TabsTrigger
                  value="candidate-resume"
                  className="data-[state=active]:bg-primary py-3 rounded-full data-[state=active]:text-white cursor-pointer"
                >
                  Candidate Resume
                </TabsTrigger>
                <TabsTrigger
                  value="candidate-video"
                  className="data-[state=active]:bg-primary py-3 rounded-full data-[state=active]:text-white cursor-pointer"
                >
                  Candidate Loom Video
                </TabsTrigger>
              </TabsList>
              <TabsContent value="candidate-resume">
                {candidate.resumeFile ? (
                  <CandidateResume candidate={candidate} />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-4 p-8 h-full">
                    <File className="mx-auto w-16 h-16 text-muted-foreground" />
                    <div className="space-y-2 text-center">
                      <h3 className="font-semibold text-lg">No Resume Found</h3>
                      <p className="text-muted-foreground text-sm">
                        This candidate hasn't a resume file
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="candidate-video">
                {candidate.loomLink ? (
                  <LoomPlayer
                    hideEmbedTopBar
                    src="https://www.loom.com/share/197dbeb9da8445d3a1eecb799373c1e2"
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-4 p-8 h-full">
                    <VideoIcon className="mx-auto w-16 h-16 text-muted-foreground" />
                    <div className="space-y-2 text-center">
                      <h3 className="font-semibold text-lg">No Video Found</h3>
                      <p className="text-muted-foreground text-sm">
                        This candidate hasn't a Loom video
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
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
