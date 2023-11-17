import { FaHouse } from "react-icons/fa6";
import { HiChartPie } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalContext";

export default function Layout({ children }) {
  const { isAdmin } = useGlobal();
  return (
    <>
      <div className="container flex h-screen flex-col gap-y-6 pb-14 pt-5">
        {children}
      </div>
      <footer className="fixed bottom-0 h-14 w-full border-t bg-white/80 pb-2">
        <nav className="container flex h-full items-center justify-around text-muted-foreground">
          {isAdmin && (
            <Link
              to="/"
              className="flex aspect-square h-full flex-col items-center justify-center"
            >
              <HiChartPie className="text-xl" />
              <span className="text-xs">Panel</span>
            </Link>
          )}
          <Link
            to="/animales"
            className="flex aspect-square h-full flex-col items-center justify-center"
          >
            <FaHouse className="text-xl" />
            <span className="text-xs">Hato</span>
          </Link>
          <Link
            to="/settings"
            className="flex aspect-square h-full flex-col items-center justify-center"
          >
            <MdSettings className="text-xl" />
            <span className="text-xs">Ajustes</span>
          </Link>
        </nav>
      </footer>
    </>
  );
}
