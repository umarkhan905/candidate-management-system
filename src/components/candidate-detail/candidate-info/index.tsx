import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Candidate } from "@/types/candidate";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Briefcase,
  ChevronDown,
  DollarSign,
  GraduationCap,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CandidateStatusBadge from "@/components/CandidateStatusBadge";

interface Props {
  candidate: Candidate;
}

interface InfoSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

function InfoSection({
  title,
  icon,
  children,
  defaultOpen = true,
}: InfoSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <CollapsibleTrigger className="flex justify-between items-center hover:bg-muted/50 p-3 rounded-lg w-full transition-colors">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-md text-primary">
            {icon}
          </div>
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform",
            isOpen && "transform rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 px-3 pb-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium text-muted-foreground text-xs">{label}</span>
      <span className="text-foreground text-sm">{value}</span>
    </div>
  );
}

export const CandidateInfo = ({ candidate }: Props) => {
  return (
    <Card className="border-border border-l rounded-none h-full overflow-y-auto scrollbar-hide">
      {/* Header */}
      <CardHeader className="flex justify-between items-center bg-background border-border border-b">
        <div className="space-y-0.5">
          <CardTitle className="text-lg">{candidate.name}</CardTitle>
          <CardDescription>{candidate.currentPosition}</CardDescription>
        </div>

        <CandidateStatusBadge status={candidate.status} />
      </CardHeader>

      <CardContent>
        {/* Basic Information */}
        <InfoSection
          title="Basic Information"
          icon={<User className="w-4 h-4" />}
        >
          <div className="space-y-3">
            <InfoRow label="Name" value={candidate.name} />
            <InfoRow label="Email" value={candidate.email} />
            <InfoRow label="Phone" value={candidate.phone} />
            <InfoRow label="City" value={candidate.city} />
          </div>
        </InfoSection>

        {/* Education */}
        <InfoSection
          title="Education"
          icon={<GraduationCap className="w-4 h-4" />}
        >
          <div className="space-y-3">
            <InfoRow label="Institute" value={candidate.institute} />
            <InfoRow label="Degree" value={candidate.educationLevel} />
            <InfoRow label="Graduation Year" value={candidate.graduationYear} />
          </div>
        </InfoSection>

        <InfoSection
          title="Professional Experience"
          icon={<Briefcase className="w-4 h-4" />}
        >
          <div className="space-y-3">
            <InfoRow
              label="Current Position"
              value={candidate.currentPosition}
            />
            <InfoRow label="Current Company" value={candidate.currentCompany} />
            <InfoRow
              label="Total Experience"
              value={`${candidate.experienceYears} years`}
            />
            <InfoRow label="Notice Period" value={candidate.noticePeriod} />
            {candidate.reasonToSwitch && (
              <InfoRow
                label="Reason to Switch"
                value={candidate.reasonToSwitch}
              />
            )}
          </div>
        </InfoSection>

        <InfoSection
          title="Compensation"
          icon={<DollarSign className="w-4 h-4" />}
        >
          <div className="space-y-3">
            <InfoRow
              label="Current Salary"
              value={`PKR ${candidate.currentSalary.toLocaleString()}`}
            />
            <InfoRow
              label="Expected Salary"
              value={`PKR ${candidate.expectedSalary.toLocaleString()}`}
            />
            {candidate.expectedSalaryPartTime && (
              <InfoRow
                label="Expected (Part-time)"
                value={`PKR ${candidate.expectedSalaryPartTime.toLocaleString()}`}
              />
            )}
          </div>
        </InfoSection>
      </CardContent>
    </Card>
  );
};
