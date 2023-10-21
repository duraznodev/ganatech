import { FaHouse } from "react-icons/fa6";
import { HiChartPie } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalContext";

export default function Layout({ children }) {
  const { isAdmin } = useGlobal();
  return (
    <>
      <div className="container h-screen pt-5 pb-14 flex flex-col gap-y-6">
        {children}
      </div>
      <footer className="fixed bottom-0 pb-2 border-t h-14 bg-white/80 w-full">
        <nav className="container h-full justify-around flex items-center text-muted-foreground">
          {isAdmin && (
            <Link
              to="/"
              className="h-full justify-center flex-col flex items-center aspect-square"
            >
              <HiChartPie className="text-xl" />
              <span className="text-xs">Panel</span>
            </Link>
          )}
          <Link
            to="/animales"
            className="h-full justify-center flex-col flex items-center aspect-square"
          >
            <FaHouse className="text-xl" />
            <span className="text-xs">Hato</span>
          </Link>
          <Link
            to="/settings"
            className="h-full justify-center flex-col flex items-center aspect-square"
          >
            <MdSettings className="text-xl" />
            <span className="text-xs">Ajustes</span>
          </Link>
        </nav>
      </footer>
    </>
  );
}
