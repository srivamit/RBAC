import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "../../components/Modal";
import UserModal from "../../components/UserModal";
import UserEditModal from "../../components/UserEditModal";
import RoleEditModal from "../../components/RoleEditModal";



import "./Dashboard.css";





const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [roleName, setRoleName] = useState("");

  const [editingRole, setEditingRole] = useState(null);
  const [isRoleEditModalOpen, setIsRoleEditModalOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://admindashboard-jywc.onrender.com/api/users")
      .then((response) => {
        setUsers(response.data);
        setActiveUsers(response.data.filter(user => user.status === 'active').length);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    axios
      .get("https://admindashboard-jywc.onrender.com/api/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  const addRole = () => {
    setIsModalOpen(true);
  };

  const addUser = () => {
    setIsUserModalOpen(true);
  };

  const handleSubmitRole = async () => {
    if (!roleName) {
      toast.error("Role name is required");
      return;
    }

    if (permissions.length === 0) {
      toast.error("At least one permission is required");
      return;
    }

    setRoleName("");
    setPermissions([]);
    setIsModalOpen(false);

    try {
      const response = await axios.post("https://admindashboard-jywc.onrender.com/api/roles", {
        name: roleName,
        permissions: permissions,
      });
      toast.success(response.data.message);
      setRoleName("");
      setPermissions([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding role");
    }

    axios
      .get("https://admindashboard-jywc.onrender.com/api/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  };

  const handleDeleteRole = async (roleId) => {
    try {
      const response = await axios.delete(`https://admindashboard-jywc.onrender.com/api/roles/${roleId}`);
      toast.success(response.data.message);
      const updatedRoles = roles.filter((role) => role._id !== roleId);
      setRoles(updatedRoles);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting role");
    }
  };

  const openRoleEditModal = (role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setPermissions(role.permissions);
    setIsRoleEditModalOpen(true);
  };

  const handleEditRole = async () => {
    if (permissions.length === 0) {
      toast.error("At least one permission is required");
      return;
    }

    try {
      const response = await axios.put(`https://admindashboard-jywc.onrender.com/api/roles/${editingRole._id}/permissions`, {
        permissions,
      });

      toast.success(response.data.message);
      setRoles((prevRoles) =>
        prevRoles.map((r) => (r._id === editingRole._id ? { ...r, permissions } : r))
      );

      setIsRoleEditModalOpen(false);
      setEditingRole(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating permissions");
    }
  };
 

  const handleSubmitUser = async () => {
    if (!name || !email || !role) {
      toast.info("All fields are required");
      return;
    }

    setName("");
    setEmail("");
    setRole("");
    setPassword("");
    setIsUserModalOpen(false);

    try {
      const response = await axios.post("https://admindashboard-jywc.onrender.com/api/register", {
        name: name,
        email: email,
        role: role,
        password: password,
      });
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding user");
    }

    axios
      .get("https://admindashboard-jywc.onrender.com/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`https://admindashboard-jywc.onrender.com/api/users/${userId}`);
      toast.success(response.data.message);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting user");
    }
  };
  const [editingUser, setEditingUser] = useState(null);

  const openEditModal = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role._id);
    setStatus(user.status);
    setIsEditModalOpen(true);
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleEditUser = async () => {
    try {
      const response = await axios.put(`https://admindashboard-jywc.onrender.com/api/users/${editingUser._id}/status-role`, {
        role,
        status,
      });

      toast.success(response.data.message);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === editingUser._id ? { ...u, role: roles.find((r) => r._id === role), status } : u
        )
      );

      setIsEditModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating user");
    }
  };
  return (
      <div>   
       <div className="navbar">
        <h1 className="navbar-title">Admin Dashboard</h1>
        <div className="navbar-links">
          <button className="navbar-link" onClick={() => handleScrollToSection("userBox")}>
            Manage Users
          </button>
          <button className="navbar-link" onClick={() => handleScrollToSection("roleBox")}>
            Manage Roles
          </button>
        </div>
      </div> 
      <div style={{ display: "flex" ,overlay:"auto"}}>
              
             
      <div style={{ flex: 1, padding: "20px" }}>
        {/* <h1>Admin Dashboard</h1> */}

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div className="card">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div className="card">
            <h3>Total Roles</h3>
            <p>{roles.length}</p>
          </div>
          <div className="card">
            <h3>Active Users</h3>
            <p>{activeUsers}</p>
          </div>
        </div>

        <div className="userContainer" id="userBox" style={{ marginBottom: "20px" }}>
          <h2>User Management</h2>
          <button onClick={addUser}>Add User +</button>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td>{user.status}</td>
                  <td>
                <button onClick={() => openEditModal(user)}>Edit</button>
                <button className="delbut" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="roleContainer" id="roleBox" style={{ marginBottom: "20px" }}>
          <h2>Role Management</h2>
          <button onClick={addRole}>Add Role +</button>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr>
                <th>Role</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role._id}>
                  <td>{role.name}</td>
                  <td>{role.permissions.join(", ")}</td>
                  <td>
                  <button onClick={() => openRoleEditModal(role)}>Edit</button>
    <button className="delbut" onClick={() => handleDeleteRole(role._id)}>Delete</button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitRole}
        roleName={roleName}
        setRoleName={setRoleName}
        permissions={permissions}
        setPermissions={setPermissions}
      />

      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={handleSubmitUser}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        role={role}
        setRole={setRole}
        roles={roles}
        setPassword={setPassword}
        password={password}
      />
       <UserEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditUser}
        name={name}
        email={email}
        role={role}
        setRole={setRole}
        status={status}
        setStatus={setStatus}
        roles={roles}
      />
            {/* RoleEditModal Integration */}
            <RoleEditModal
        isOpen={isRoleEditModalOpen}
        onClose={() => setIsRoleEditModalOpen(false)}
        onSubmit={handleEditRole}
        roleName={roleName}
        permissions={permissions}
        setPermissions={setPermissions}
      />

      <ToastContainer />
    </div></div>

  );
};

export default DashboardPage;
