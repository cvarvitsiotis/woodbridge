import { divisions } from "@/config/races";
import { DivisionType } from "@/types";

function getDivisionColor(division: DivisionType): string {
  switch (division?.num) {
    case divisions.one.num:
      return "text-primary-600";
    case divisions.two.num:
      return "text-warning-600";
    case divisions.three.num:
      return "text-danger-600";
    case divisions.four.num:
      return "";
    default:
      return "";
  }
}

export function Division({ division }: { division: DivisionType }) {
  const divisionColor = getDivisionColor(division);
  return <span className={divisionColor}>{division.name}</span>;
}

export default function Divisions({ divisions }: { divisions?: DivisionType[] }) {
  if (!divisions?.length) return null;
  else if (divisions.length === 1) return <Division division={divisions[0]} />;
  else
    return (
      <div>
        <Division division={divisions[0]} /> / <Division division={divisions[1]} />
      </div>
    );
}
