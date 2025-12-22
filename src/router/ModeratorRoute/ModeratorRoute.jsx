import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import Forbidden from "../../components/Forbidden/Forbidden";
import Spinner from "../../components/Spinner/Spinner";

const ModeratorRoute = ({ children }) => {
  const { role, roleLoading } = useRole();
  const { authLoading } = useAuth();
  if (roleLoading || authLoading) {
    return <Spinner />;
  }
  if (role !== "moderator") {
    return <Forbidden />;
  }
  return children;
};

export default ModeratorRoute;
