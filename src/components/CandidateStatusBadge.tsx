import type { CandidateStatus } from "@/types/candidate";
import { Badge } from "./ui/badge";

interface Props {
  status: CandidateStatus;
}

export default function CandidateStatusBadge({ status }: Props) {
  const statusClasses = {
    New: "bg-status-new/20 text-status-new",
    Screening: "bg-status-screening/20 text-status-screening",
    Interviewed: "bg-status-interviewed/20 text-status-interviewed",
    Pass: "bg-status-pass/20 text-status-pass",
    Fail: "bg-status-fail/20 text-status-fail",
    "On Hold": "bg-status-hold/20 text-status-hold",
  };

  return <Badge className={statusClasses[status]}>{status}</Badge>;
}
