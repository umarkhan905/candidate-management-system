import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Candidate } from "@/types/candidate";
import { CandidateInfo } from ".";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface Props {
  candidate: Candidate;
}

export const CandidateInfoSheet = ({ candidate }: Props) => {
  const isDesktop = useMediaQuery("(min-width:1024px)");

  if (isDesktop) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="cursor-pointer">
          <User /> <span className="hidden sm:block">View Details</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <CandidateInfo candidate={candidate} />
      </SheetContent>
    </Sheet>
  );
};
