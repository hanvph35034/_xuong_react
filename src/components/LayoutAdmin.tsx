import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const LayoutAdmin = () => {
  const { dispatchUser } = useContext(AuthContext);
  const logout = () => {
    dispatchUser({
      type: "logout",
    });
  };
  return (
    <div>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
      </button>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link to={""} className="flex no-underline items-center ps-2.5 mb-5">
            <img src="" className="h-6 me-3 sm:h-7" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Admin Panel
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/admin"}
                className="flex no-underline items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="flex no-underline items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">User</span>
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="flex no-underline items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">messger</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                onClick={logout}
                className="flex no-underline items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
};
export default LayoutAdmin;
