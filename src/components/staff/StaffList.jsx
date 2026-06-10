import React, { useEffect, useState } from "react";
import StaffTable from "./StaffTable";
import { ROUTES } from "../../constants/routes";

export default function StaffList({ setActivePage }) {
  const [staff, setStaff] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // dialog state

  const fetchStaff = async () => {
    const formData = new FormData();

formData.append("doctype", "Employee");

formData.append(
  "fields",
  JSON.stringify([
    "`tabEmployee`.`name`",
    "`tabEmployee`.`owner`",
    "`tabEmployee`.`creation`",
    "`tabEmployee`.`modified`",
    "`tabEmployee`.`modified_by`",
    "`tabEmployee`.`_user_tags`",
    "`tabEmployee`.`_comments`",
    "`tabEmployee`.`_assign`",
    "`tabEmployee`.`_liked_by`",
    "`tabEmployee`.`docstatus`",
    "`tabEmployee`.`idx`",
    "`tabEmployee`.`employee_name`",
    "`tabEmployee`.`status`",
    "`tabEmployee`.`designation`",
    "`tabEmployee`.`ctc`",
    "`tabEmployee`.`image`",
    "`tabEmployee`.`branch`",
    "`tabEmployee`.`department`",
    "`tabEmployee`.`salary_currency`"
  ])
);

formData.append(
  "filters",
  JSON.stringify([
    ["Employee", "status", "=", "Active"]
  ])
);

formData.append(
  "order_by",
  "`tabEmployee`.`modified` desc"
);

formData.append("start", "0");
formData.append("page_length", "20");
formData.append("view", "List");
formData.append("group_by", "");
formData.append("with_comment_count", "true");
    try {
      
      const res = await fetch(
       "http://localhost:8000/api/method/frappe.desk.reportview.get",
    {
      method: "POST",
      credentials: "include",
      headers: {
      
        "X-Frappe-CSRF-Token":
        window.frappe?.csrf_token || "",
      },
      body: formData,
    }
      );
      const data = await res.json();
      setStaff(data?.message || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    const formData = new FormData();
    formData.append("doctype", "Employee");
    formData.append("name", deleteId);
    try {
      await fetch(
        `http://localhost:8000/api/method/frappe.client.delete`,
        {
          method: "POST",
          headers: {
            "X-Frappe-CSRF-Token": window.frappe?.csrf_token || "",
          },
          credentials: "include",
          body: formData,
        }
      );
      setDeleteId(null);
      fetchStaff();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (staff) => {
    localStorage.setItem("editStaffId", staff.id);
    setActivePage(ROUTES.STAFF_EDIT);
  };

  const handleAdd = () => {
    setActivePage(ROUTES.STAFF_FORM);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Staff Records
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => setActivePage(ROUTES.STAFF_DASHBOARD)}
          className=" bg-gray-500 text-white px-2 py-3 rounded-xl hover:bg-gray-600 transition"
        >
          Back
        </button>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Add Staff
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-6">
        <StaffTable
          data={staff}
          onEdit={handleEdit}
          onDelete={setDeleteId} // open dialog instead of delete directly
        />
      </div>

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[350px] text-center">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-5">
              Are you sure you want to delete this staff?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Yes, Delete
              </button>

              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
