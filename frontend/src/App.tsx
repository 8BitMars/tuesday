import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Pricing } from "./pages/Pricing";
import { NavigationBar } from "./components/NavigationBar";
import {
  BOARD_TASKS_URI,
  HOME_URI,
  LOGIN_URI,
  PROJECT_BOARDS_URI,
  SIGN_UP_URI,
  PROFILE_URI,
  PRICING_URI,
} from "./constants/navigation";
import { Banner } from "./components/Banner";
import { Home } from "./pages/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useIsAuthenticated } from "./hooks/auth/useAuth";
import { Sidebar } from "./components/Sidebar";
import { Boards } from "./pages/Board/Boards";
import { Tasks } from "./pages/Task/Tasks";

const PrivateRoute = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return (
      <div className="pl-8 ml-2">
        <Sidebar />
        <Outlet />
      </div>
    );
  }
  return <Navigate to="/login" />;
};

function App() {
  const isAuthenticated = useIsAuthenticated();
  const queryClient = new QueryClient();
  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-200 to-white text-text-500">
      <QueryClientProvider client={queryClient}>
        <NavigationBar />
        {!isAuthenticated && <Banner />}
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path={HOME_URI} element={<Home />} />
            <Route path={PROJECT_BOARDS_URI} element={<Boards />} />
            <Route path={BOARD_TASKS_URI} element={<Tasks />} />
            <Route path={PROFILE_URI} element={<Profile />} />
          </Route>
          <Route path={SIGN_UP_URI} element={<SignUp />} />
          <Route path={LOGIN_URI} element={<Login />} />
          <Route path={PRICING_URI} element={<Pricing />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
