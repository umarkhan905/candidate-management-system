import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CANDIDATE_STATUS } from "@/constants/candidate";
import { useCandidates } from "@/context/CandidateContext";
import { cn } from "@/lib/utils";
import type {
  Candidate,
  CandidateStatus,
  RemarksType,
} from "@/types/candidate";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  candidate: Candidate;
}

export const RemarksWidget = ({ candidate }: Props) => {
  const { service, state } = useCandidates();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [remarksType, setRemarksType] = useState<RemarksType>("HR");
  const [hrRemarks, setHrRemarks] = useState(() => candidate.hrRemarks || "");
  const [interviewerRemarks, setInterviewerRemarks] = useState(
    () => candidate.interviewerRemarks || ""
  );
  const [status, setStatus] = useState<CandidateStatus>(() => candidate.status);

  const toggleIsCollapsed = () => setIsCollapsed((prev) => !prev);

  const isLoading = state.loading.type === "UPDATE" && state.loading.active;

  const handleSaveRemarks = async () => {
    await service.updateCandidate(candidate.id, {
      hrRemarks,
      interviewerRemarks,
      status,
    });
    toast.success("Candidate updated successfully");
  };

  return (
    <div className="right-1/2 sm:right-2 bottom-2 z-10 fixed w-full max-w-sm translate-x-1/2 sm:translate-x-0">
      <Card className="gap-0 p-0 rounded-md">
        <CardHeader
          className={`flex justify-between items-center p-4 cursor-pointer ${
            !isCollapsed && "border-b border-border"
          }`}
          onClick={toggleIsCollapsed}
        >
          <CardTitle>Remarks & Status</CardTitle>

          <ChevronDown
            className={cn(
              "transition-transform",
              !isCollapsed && "transform rotate-180"
            )}
          />
        </CardHeader>

        {!isCollapsed && (
          <CardContent className="space-y-4 py-4 max-h-[50vh] overflow-y-auto scrollbar-hide">
            <div className="space-y-2">
              <Label>Adding remarks as</Label>
              <Select
                value={remarksType}
                onValueChange={(value: RemarksType) => setRemarksType(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Interviewer">Interviewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hr-remarks">HR Remarks</Label>
              <Textarea
                id="hr-remarks"
                value={hrRemarks}
                onChange={(e) => setHrRemarks(e.target.value)}
                disabled={remarksType !== "HR"}
                className={cn(
                  "min-h-20 resize-none",
                  remarksType !== "HR" && "bg-muted/50 cursor-not-allowed"
                )}
                placeholder={
                  remarksType === "HR"
                    ? "Add HR remarks..."
                    : "Only HR can edit"
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interviewer-remarks">Interviewer Remarks</Label>
              <Textarea
                id="interviewer-remarks"
                value={interviewerRemarks}
                onChange={(e) => setInterviewerRemarks(e.target.value)}
                disabled={remarksType !== "Interviewer"}
                className={cn(
                  "min-h-20 resize-none",
                  remarksType !== "Interviewer" &&
                    "bg-muted/50 cursor-not-allowed"
                )}
                placeholder={
                  remarksType === "Interviewer"
                    ? "Add interviewer remarks..."
                    : "Only Interviewer can edit"
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value: CandidateStatus) => setStatus(value)}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CANDIDATE_STATUS.map((status) => (
                    <SelectItem value={status} key={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full"
              onClick={handleSaveRemarks}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
