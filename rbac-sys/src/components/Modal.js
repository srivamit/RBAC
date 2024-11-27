import React from "react";
import "./Modal.css";  // Import styles for the modal

const Modal = ({ isOpen, onClose, onSubmit, roleName, setRoleName, permissions, setPermissions }) => {
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setPermissions((prevPermissions) =>
      checked
        ? [...prevPermissions, value]
        : prevPermissions.filter((perm) => perm !== value)
    );
  };

  if (!isOpen) return null; // Do not render if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Role</h2>
        <input
          type="text"
          placeholder="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <div>
          <label>
            <input
              type="checkbox"
              value="Read"
              checked={permissions.includes("Read")}
              onChange={handlePermissionChange}
            />
            Read
          </label>
          <label>
            <input
              type="checkbox"
              value="Write"
              checked={permissions.includes("Write")}
              onChange={handlePermissionChange}
            />
            Write
          </label>
          <label>
            <input
              type="checkbox"
              value="Delete"
              checked={permissions.includes("Delete")}
              onChange={handlePermissionChange}
            />
            Delete
          </label>
        </div>
        <button onClick={onSubmit}>Add Role</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
