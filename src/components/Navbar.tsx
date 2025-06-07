import { Link } from "react-router-dom";
import { authLogout } from '../services/auth/Auth';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import logo from '../assets/logo.png';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { ConfirmActionModal } from "./ConfirmActionModal";
import { validatePermission } from "../services/auth/Auth";

const Navbar = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.token);


  const canAdminUsers = validatePermission('list.users');


  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalLogOut, setOpenModalLogout] = useState(false);

  const logout = () => {
    authLogout();
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white px-4 shadow-md relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img className="w-12 h-12" src={logo} alt="Logo App" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Gettask</span>
        </Link>
        <button
          type="button"
          onClick={() =>
            setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open menu</span>
          {isOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
        </button>
        <div
          className={`fixed left-0 top-16 w-full bg-white border-t border-gray-200 shadow-lg z-50 transition-all duration-300 ease-in-out ${isOpen ? 'mt-2 block' : 'hidden'
            } md:static md:block md:w-auto md:border-0 md:shadow-none md:top-0 md:z-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="block py-2 px-3 hover:underline cursor-pointer"
              >
                Dashboard
              </Link>
            </li>
            {(canAdminUsers) && (
              <li>
                <Link
                  to="/users"
                  onClick={closeMenu}
                  className="block py-2 px-3 hover:underline cursor-pointer"
                >
                  Users
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/tasks"
                onClick={closeMenu}
                className="block py-2 px-3 hover:underline cursor-pointer"
              >
                Tasks
              </Link>
            </li>

            <li>
              <button
                onClick={() => setOpenModalLogout(true)}
                className="block py-2 px-3 text-red-600 hover:underline cursor-pointer"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <ConfirmActionModal
        isOpen={isOpenModalLogOut}
        onConfirm={logout}
        withReason={false}
        title="Log Out"
        message="Are you sure you want to log out?"
        confirmLabel="Confirm"
        cancelLabel="cancel"
      />
    </nav>
  );
};

export default Navbar;
