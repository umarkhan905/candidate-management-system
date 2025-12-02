import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import type { Candidate } from "@/types/candidate";
import CandidateStatusBadge from "@/components/CandidateStatusBadge";

interface Props {
  candidates: Candidate[];
}

export const CandidateTable = ({ candidates }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card shadow-sm border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Position</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-right">
              Experience
            </TableHead>
            <TableHead className="font-semibold">City</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-muted-foreground text-center"
              >
                No candidates found
              </TableCell>
            </TableRow>
          ) : (
            candidates.map((candidate, i) => (
              <TableRow
                key={i}
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => navigate(`/candidate/${candidate.id}`)}
              >
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {candidate.email}
                </TableCell>
                <TableCell>{candidate.appliedPosition}</TableCell>
                <TableCell>
                  <CandidateStatusBadge status={candidate.status} />
                </TableCell>
                <TableCell className="text-right">
                  {candidate.experienceYears} years
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {candidate.city}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
