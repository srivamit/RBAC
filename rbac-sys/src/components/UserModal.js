import React from "react";
import "./Modal.css"; 

const UserModal = ({ isOpen, onClose, onSubmit, name, setName, email, setEmail, role, setRole, roles, password, setPassword }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New User</h2>
        <div>
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled>
                Select Role
              </option>
              {roles.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              placeholder="Enter user password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button onClick={onSubmit}>Add User</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserModal;
