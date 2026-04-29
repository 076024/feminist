import { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface Props {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const EmptyState = ({ title, description, icon, action }: Props) => (
  <div className="flex flex-col items-center justify-center text-center py-12 px-4 rounded-lg border border-dashed bg-muted/30">
    <div className="mb-3 text-muted-foreground">{icon ?? <Inbox className="h-10 w-10" />}</div>
    <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
    {description && <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;