import { Navigate } from "react-router";
import useRole from "../../../hooks/useRole";
import Analytics from "../Analytics/Analytics";

const DashBoardHome = () => {
  const { role } = useRole();

  if (role === "admin") {
    return <Analytics />;
  }
  if (role === "moderator" || role === "student") {
    return <Navigate to={"/dashboard/me"} replace={true} />;
  }
};

export default DashBoardHome;
