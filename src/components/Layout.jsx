import { FaHouse, FaList } from "react-icons/fa6";
import { HiChartPie } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="container h-screen pt-5 pb-14 flex flex-col gap-y-6">
        <Outlet />
      </div>
      <footer className="fixed bottom-4 pb-2 border-t h-14 bg-white/80 w-full">
        <nav className="container h-full justify-around flex items-center text-muted-foreground">
          <Link
            to="/"
            className="h-full justify-center flex-col flex items-center aspect-square"
          >
            <HiChartPie className="text-xl" />
            <span className="text-xs">Panel</span>
          </Link>
          <Link
            to="/bovinos"
            className="h-full justify-center flex-col flex items-center aspect-square"
          >
            <FaHouse className="text-xl" />
            <span className="text-xs">Finca</span>
          </Link>
          <Link
            to="/"
            className="h-full justify-center flex-col flex items-center aspect-square"
          >
            <FaList className="text-xl" />
            <span className="text-xs">Acciones</span>
          </Link>
        </nav>
      </footer>
    </>
  );
}
