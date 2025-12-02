import { TriangleAlert } from "lucide-react";

interface Props {
  message: string;
}

export const ErrorCard = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 bg-destructive/20 p-3 rounded-md text-destructive">
      <TriangleAlert className="size-5" />
      <p className="font-semibold text-sm">{message}</p>
    </div>
  );
};
