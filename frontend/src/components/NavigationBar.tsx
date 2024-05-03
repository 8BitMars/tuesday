import { useNavigate } from "react-router-dom";
import {
  // FeatureOptions,
  PROFILE_URI,
  LOGIN_URI,
  SIGN_UP_URI,
  PRICING_URI,
} from "../constants/navigation";
// import { PlanOptions } from "./../constants/navigation";
// import { DropDown } from "./DropDown";
import { ArrowSmallRightIcon, Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";
import { useIsAuthenticated, useLogout } from "../hooks/auth/useAuth";
import logo from '../images/tuesday-logo.svg'

interface LinkProps extends React.PropsWithChildren {
  to: string;
  className?: string;
}
const Link = ({ children, to, className }: LinkProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`inline-flex items-center p-2 mx-2 cursor-pointer rounded hover:font-semibold, hover:bg-primary-200 hover:text-primary-500 transition-all hover:bg-opacity-50 ${className}`}
      onClick={() => navigate(to)}
    >
      {children}
    </div>
  );
};

const NavItems = [
  // <DropDown key={0} text="Features" options={FeatureOptions} />,
  <Link key={0} to={PRICING_URI}>
    Pricing
  </Link>,
  <Link key={1} to="">
    Solutions
  </Link>,
  <Link key={2} to="">
    Docs
  </Link>,
];

const LoginLogoutButton = () => {
  const isAuthenticated = useIsAuthenticated();
  const logout = useLogout();
  const isOnLogin = window.location.pathname.includes(LOGIN_URI);

  if (isAuthenticated) {
    return (
      <div
        className="inline-flex items-center p-2 cursor-pointer rounded hover:font-semibold, hover:bg-primary-200 hover:text-primary-500 transition-all hover:bg-opacity-50"
        onClick={logout}
      >
        Logout
      </div>

    )
  }
  if (isOnLogin) {
    return <Link to={SIGN_UP_URI}>Sign Up</Link>;
  }
  return <Link to={LOGIN_URI}>Login</Link>;
};

const MobileMenu = () => {
  return (
    <Menu as="div" className="lg:hidden">
      <Menu.Button className="z-30 flex items-center p-4">
        <Bars3Icon height={24} width={24} />
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-30 w-full p-4 space-y-4 overflow-auto bg-white shadow top-16 ring-1 ring-black ring-opacity-5 focus:outline-none">
        {NavItems.map((NavItem, i) => (
          <Menu.Item key={"menu-item-" + i}>{NavItem}</Menu.Item>
        ))}
        <Menu.Item>
          <LoginLogoutButton />
        </Menu.Item>
        <Menu.Item>
          <SignUpButton />
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

const DesktopMenu = () => {
  return (
    <div className="justify-between hidden w-full lg:flex">
      <div className="flex items-center justify-start h-16">
        {NavItems.map((NavItem) => NavItem)}
      </div>

      <div className="flex items-center h-16">
        <LoginLogoutButton />
        <SignUpButton />
      </div>
    </div>
  );
};

export const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-full h-16 py-4 pl-4 bg-white lg:justify-start">
      <div
        className="mr-2 cursor-pointer"
        onClick={() => navigate("")}
      >
        <img 
        className="hidden h-16 w-auto lg:block"
        src={logo}
        alt={"tuesday.com logo"}
        />
      </div>

      <MobileMenu />

      <DesktopMenu />
    </div>
  );
};

const SignUpButton = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return(
      <div 
        className="mr-4 inline-flex items-center mx-2 cursor-pointer rounded hover:font-semibold, hover:text-primary-500 transition-all hover:bg-opacity-50"
        onClick={() => navigate(PROFILE_URI)}
      >
        <UserCircleIcon
          className="flex items-center cursor-pointer"
          height={32}
          width={32}
        />
      </div>
    );
  }
  return (
    <div
      key="signupbutton"
      className="flex items-center justify-center py-2 px-4 ml-2 mr-4 rounded-full text-white cursor-pointer bg-primary-500 transition-all hover:bg-primaryhover-500 capitalize"
      onClick={() => navigate(SIGN_UP_URI)}
    >
      Get Started
      <ArrowSmallRightIcon
        className="ml-1"
        height={16} 
        width={16} 
      />
    </div>
  );
};