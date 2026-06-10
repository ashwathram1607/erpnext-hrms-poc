import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { ROUTES } from "../../constants/routes";

export default function StaffForm({ setActivePage }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    date_of_joining: "",
    company: "",
    designation: "",
    department: "",
    branch: "",
    status: "Active",
    ctc: "",
  });

  const [companies, setCompanies] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [loadedFields, setLoadedFields] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchByField = async (doctype, setter) => {
    if (loadedFields[doctype]) return;

    try {
      const formData = new FormData();
      formData.append("txt", "");
      formData.append("doctype", doctype);
      formData.append("ignore_user_permissions", "0");
      formData.append("reference_doctype", "Employee");

      const response = await fetch(
        "http://localhost:8000/api/method/frappe.desk.search.search_link",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "X-Frappe-CSRF-Token": window.frappe?.csrf_token || "",
          },
          body: formData,
        }
      );

      const result = await response.json();

      setter(result?.results || []);

      setLoadedFields((prev) => ({
        ...prev,
        [doctype]: true,
      }));
    } catch (error) {
      console.error(`Error fetching ${doctype}:`, error);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      doctype: "Employee",
      naming_series: "HR-EMP-",
      first_name: form.first_name,
      last_name: form.last_name,
      employee_name: `${form.first_name} ${form.last_name}`.trim(),
      gender: form.gender,
      date_of_birth: form.date_of_birth,
      date_of_joining: form.date_of_joining,
      company: form.company,
      designation: form.designation,
      department: form.department,
      branch: form.branch,
      status: form.status,
      ctc: Number(form.ctc || 0),
      salary_currency: "INR",
    };

    const formData = new FormData();
    formData.append("doc", JSON.stringify(payload));
    formData.append("action", "Save");

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/api/method/frappe.desk.form.save.savedocs",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "X-Frappe-CSRF-Token": window.frappe?.csrf_token || "",
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || result.exc) {
        throw new Error(
          result._server_messages ||
            result.exception ||
            "Failed to save employee"
        );
      }

      setShowSuccess(true);

      setForm({
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        date_of_joining: "",
        company: "",
        designation: "",
        department: "",
        branch: "",
        status: "Active",
        ctc: "",
      });
    } catch (error) {
      console.error("Save Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
          Add Staff
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="block mb-2 font-medium">First Name *</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 font-medium">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-medium">Gender *</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-2 font-medium">Date of Birth *</label>
            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label className="block mb-2 font-medium">Date of Joining *</label>
            <input
              type="date"
              name="date_of_joining"
              value={form.date_of_joining}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block mb-2 font-medium">Company *</label>
            <select
              name="company"
              value={form.company}
              onChange={handleChange}
              onFocus={() => fetchByField("Company", setCompanies)}
              required
              className="w-full p-3 border rounded-xl"
            >
              <option value="">Select Company</option>

              {companies.map((company) => (
                <option key={company.value} value={company.value}>
                  {company.value}
                </option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block mb-2 font-medium">Designation</label>
            <select
              name="designation"
              value={form.designation}
              onChange={handleChange}
              onFocus={() =>
                fetchByField("Designation", setDesignations)
              }
              className="w-full p-3 border rounded-xl"
            >
              <option value="">Select Designation</option>

              {designations.map((designation) => (
                <option
                  key={designation.value}
                  value={designation.value}
                >
                  {designation.value}
                </option>
              ))}
            </select>
          </div>

          {/* CTC */}
          <div>
            <label className="block mb-2 font-medium">CTC (₹)</label>
            <input
              type="number"
              name="ctc"
              value={form.ctc}
              onChange={handleChange}
              placeholder="500000"
              className="w-full p-3 border rounded-xl"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setActivePage(ROUTES.STAFF_DASHBOARD)}
            className="flex items-center gap-2 text-blue-600"
          >
            <IoArrowBack />
            Back
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Staff"}
          </button>
        </div>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl text-center w-80">
            <div className="text-green-600 text-5xl mb-3">✓</div>

            <h2 className="text-xl font-semibold">
              Staff Added Successfully
            </h2>

            <button
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg"
              onClick={() => {
                setShowSuccess(false);
                setActivePage(ROUTES.STAFF_LIST);
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}