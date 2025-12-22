import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}/role`);
      return data?.role;
    },
  });

  return { role, roleLoading };
};

export default useRole;
