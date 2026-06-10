import React from "react";

export default function StaffTable({ data, onEdit, onDelete }) {
  const staffList = Array.isArray(data?.values)
    ? data.values.map((row) =>
        Object.fromEntries(
          data.keys.map((key, index) => [key, row[index]])
        )
      )
    : [];
console.log("🔍 Staff Data for Table:", staffList);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Employee ID</th>
            <th className="p-3 text-left">Employee Name</th>
            <th className="p-3 text-left">Designation</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">CTC</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {staffList.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No employees found
              </td>
            </tr>
          ) : (
            staffList.map((staff, idx) => (
              <tr
                key={staff.name}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-3 border-b">{staff.name}</td>
                <td className="p-3 border-b">{staff.employee_name}</td>
                <td className="p-3 border-b">{staff.designation || "-"}</td>
              


                <td className="p-3 border-b">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      staff.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>

                <td className="p-3 border-b">
                  ₹{Number(staff.ctc || 0).toLocaleString()}
                </td>

                <td className="p-3 border-b text-center">
                  {/* <button
                    onClick={() => onEdit(staff)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button> */}

                  <button
                    onClick={() => onDelete(staff.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}