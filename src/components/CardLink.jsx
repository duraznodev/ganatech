import { Link } from "react-router-dom";

export default function CardLink({ children, to }) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border bg-card text-card-foreground shadow-sm">
      <Link
        to={to}
        className="flex flex-1 items-center justify-center gap-x-2 py-4 text-lg font-semibold"
      >
        {children}
      </Link>
    </div>
  );
}
