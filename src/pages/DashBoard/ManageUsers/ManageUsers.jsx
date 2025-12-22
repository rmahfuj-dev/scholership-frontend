import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Users,
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  Loader2,
  AlertTriangle,
  UserCog,
  Mail,
  Calendar,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import SearchInput from "../../AllScholarships/Search";
import searchLoading from "../../../assets/animations/searchLoading.json";
import Lottie from "lottie-react";
import Pagination from "../../../components/Pagination/Pagination";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const roleModalRef = useRef(null);
  const deleteModalRef = useRef(null);

  const [totalPages, setTotalPages] = useState(1);
  const limit = 7;
  const [page, setPage] = useState(1);

  // Fetch users
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", search, roleFilter, limit, page],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users?search=${search}&filter=${roleFilter}&limit=${limit}&page=${page}`
      );
      setTotalPages(Math.ceil(data.totalUsers / limit));
      return data.users;
    },
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get role badge
  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <span className="badge badge-error gap-1">
            <ShieldAlert className="size-3" />
            Admin
          </span>
        );
      case "moderator":
        return (
          <span className="badge badge-warning gap-1">
            <ShieldCheck className="size-3" />
            Moderator
          </span>
        );
      default:
        return (
          <span className="badge badge-primary gap-1">
            <Shield className="size-3" />
            Student
          </span>
        );
    }
  };

  // Handle role change
  const handleRoleClick = (user) => {
    setSelectedUser(user);
    setNewRole(user.role || "student");
    roleModalRef.current?.showModal();
  };

  const confirmRoleChange = async () => {
    try {
      const { data } = await axiosSecure.patch(`/users/${selectedUser._id}`, {
        role: newRole,
      });
      if (data.modifiedCount) {
        toast.success(`Role updated to ${newRole}!`);
        refetch();
        roleModalRef.current?.close();
        setSelectedUser(null);
      }
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  // Handle delete
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    deleteModalRef.current?.showModal();
  };

  const confirmDelete = async () => {
    try {
      const { data } = await axiosSecure.delete(`/users/${selectedUser._id}`);
      if (data.deletedCount) {
        toast.success("User deleted successfully!");
        refetch();
        deleteModalRef.current?.close();
        setSelectedUser(null);
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="text-primary" />
            Manage Users
          </h1>
          <p className="text-gray-500 mt-1">{users.length} users found</p>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="stat bg-base-100 shadow rounded-lg py-2 px-4">
            <div className="stat-title text-xs">Admins</div>
            <div className="stat-value text-lg text-error">
              {users.filter((u) => u.role === "admin").length}
            </div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg py-2 px-4">
            <div className="stat-title text-xs">Moderators</div>
            <div className="stat-value text-lg text-warning">
              {users.filter((u) => u.role === "moderator").length}
            </div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg py-2 px-4">
            <div className="stat-title text-xs">Students</div>
            <div className="stat-value text-lg text-primary">
              {users.filter((u) => u.role === "student" || !u.role).length}
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="join flex-1">
              <SearchInput
                setSearch={setSearch}
                className={"w-full rounded-l-sm"}
              />
              <button className="btn btn-primary join-item">
                <Search className="size-4" />
              </button>
            </div>

            {/* Role Filter */}
            <select
              className="select select-bordered focus:outline-none"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="student">Student</option>
            </select>

            {/* Clear */}
            {(search || roleFilter) && (
              <button
                onClick={() => {
                  setSearch("");
                  setRoleFilter("");
                }}
                className="btn btn-ghost text-error"
              >
                <X className="size-4" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body p-0">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Lottie animationData={searchLoading} loop className="w-40" />
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <Users className="size-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">No users found</p>
              {(search || roleFilter) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("");
                  }}
                  className="btn btn-primary btn-sm mt-4"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                {/* Head */}
                <thead className="bg-base-200">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover">
                      {/* Serial */}
                      <td className="font-medium">{index + 1}</td>

                      {/* User Info */}
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                              <img
                                src={user.photoURL || "/profile.png"}
                                alt={user.displayName}
                                onError={(e) => (e.target.src = "/profile.png")}
                              />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">{user.displayName}</p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td>
                        <div className="flex items-center gap-2">
                          <Mail className="size-4 text-gray-400" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                      </td>

                      {/* Role */}
                      <td>{getRoleBadge(user.role)}</td>

                      {/* Joined Date */}
                      <td>
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4 text-gray-400" />
                          <span className="text-sm">
                            {formatDate(user.createdAt)}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex items-center justify-center gap-1">
                          {/* Change Role */}
                          <button
                            onClick={() => handleRoleClick(user)}
                            className="btn btn-ghost btn-sm btn-square text-warning"
                            title="Change Role"
                          >
                            <UserCog className="size-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteClick(user)}
                            className="btn btn-ghost btn-sm btn-square text-error"
                            title="Delete User"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Pagination setPage={setPage} page={page} totalPages={totalPages} />

      {/* Role Change Modal */}
      <dialog ref={roleModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <UserCog className="text-primary" />
            Change User Role
          </h3>

          {selectedUser && (
            <div className="py-4">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-base-200 rounded-lg">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full">
                    <img
                      src={selectedUser.photoURL || "/profile.png"}
                      alt={selectedUser.displayName}
                      onError={(e) => (e.target.src = "/profile.png")}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{selectedUser.displayName}</p>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                </div>
              </div>

              {/* Role Selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Select New Role
                  </span>
                </label>
                <div className="flex flex-col gap-2">
                  {/* Admin */}
                  <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-base-200 transition-colors">
                    <input
                      type="radio"
                      name="role"
                      className="radio radio-error"
                      checked={newRole === "admin"}
                      onChange={() => setNewRole("admin")}
                    />
                    <ShieldAlert className="size-5 text-error" />
                    <div className="flex-1">
                      <p className="font-medium">Admin</p>
                      <p className="text-xs text-gray-500">
                        Full access to all features
                      </p>
                    </div>
                  </label>

                  {/* Moderator */}
                  <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-base-200 transition-colors">
                    <input
                      type="radio"
                      name="role"
                      className="radio radio-warning"
                      checked={newRole === "moderator"}
                      onChange={() => setNewRole("moderator")}
                    />
                    <ShieldCheck className="size-5 text-warning" />
                    <div className="flex-1">
                      <p className="font-medium">Moderator</p>
                      <p className="text-xs text-gray-500">
                        Can review applications and provide feedback
                      </p>
                    </div>
                  </label>

                  {/* User */}
                  <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-base-200 transition-colors">
                    <input
                      type="radio"
                      name="role"
                      className="radio radio-primary"
                      checked={newRole === "student"}
                      onChange={() => setNewRole("student")}
                    />
                    <Shield className="size-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Student</p>
                      <p className="text-xs text-gray-500">
                        Can apply for scholarships
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button
              onClick={confirmRoleChange}
              className="btn btn-primary gap-2"
              disabled={newRole === selectedUser?.role}
            >
              <UserCog className="size-4" />
              Update Role
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Delete Confirmation Modal */}
      <dialog
        ref={deleteModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-4">
              <AlertTriangle className="size-8 text-error" />
            </div>
            <h3 className="font-bold text-lg">Delete User</h3>

            {selectedUser && (
              <div className="py-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img
                        src={selectedUser.photoURL || "/profile.png"}
                        alt={selectedUser?.displayName}
                        onError={(e) => (e.target.src = "/profile.png")}
                      />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{selectedUser?.displayName}</p>
                    <p className="text-sm text-gray-500">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
                <p className="text-gray-500">
                  Are you sure you want to delete this user? This action cannot
                  be undone.
                </p>
              </div>
            )}
          </div>

          <div className="modal-action justify-center gap-4">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button onClick={confirmDelete} className="btn btn-error gap-2">
              <Trash2 className="size-4" />
              Delete User
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageUsers;
