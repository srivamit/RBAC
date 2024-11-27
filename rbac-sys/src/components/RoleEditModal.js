import React from "react";

const RoleEditModal = ({
  isOpen,
  onClose,
  onSubmit,
  roleName,
  permissions,
  availablePermissions,
  setPermissions,
}) => {
  if (!isOpen) return null;

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setPermissions((prevPermissions) =>
      checked
        ? [...prevPermissions, value]
        : prevPermissions.filter((perm) => perm !== value)
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Role</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div>
            <label>Role Name:</label>
            <input type="text" value={roleName} disabled />
          </div>
          <div>
            <label>Permissions:</label>
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
          </div>
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleEditModal;
