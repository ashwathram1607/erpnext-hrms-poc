export default function AttendanceTable({
  data = [],
  users = [],
  selectedUser,
  onSelectUser,
  onExport,
  onBack,
}) {
  const validData = Array.isArray(data) ? data : [];
  const validUsers = Array.isArray(users) ? users : [];

  // Convert seconds to decimal hours
  const formatToHours = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0 hrs";
    const hours = seconds / 3600;
    return `${hours.toFixed(2)} hrs`;
  };

  // Convert UTC → IST
  const toIST = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Attendance Records
      </h2>

      {/* TOP CONTROLS */}
      <div className="grid grid-cols-3 items-center mb-6">
        
        {/* LEFT - BACK BUTTON */}
        <div className="flex justify-start">
          <button
            onClick={onBack}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            Back
          </button>
        </div>

        {/* CENTER - ALL USERS DROPDOWN */}
        <div className="flex justify-center">
          <select
            value={selectedUser}
            onChange={(e) => onSelectUser(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm min-w-[220px]"
          >
            <option key="all" value="All">
              All Users
            </option>

            {validUsers.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        {/* RIGHT - EXPORT BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={onExport}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Export to Excel
          </button>
        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-6">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 border border-gray-200">ID</th>
              <th className="p-3 border border-gray-200">Start</th>
              <th className="p-3 border border-gray-200">End</th>
              <th className="p-3 border border-gray-200">Worked</th>
              <th className="p-3 border border-gray-200">Breaks</th>
              <th className="p-3 border border-gray-200">Total Break</th>
              <th className="p-3 border border-gray-200">Username</th>
            </tr>
          </thead>

          <tbody>
            {validData.length > 0 ? (
              validData.map((r) => (
                <tr key={r.id} className="hover:bg-blue-50">
                  <td className="p-3 border border-gray-200">{r.id}</td>

                  <td className="p-3 border border-gray-200">
                    {toIST(r.startTime)}
                  </td>

                  <td className="p-3 border border-gray-200">
                    {toIST(r.endTime)}
                  </td>

                  <td className="p-3 border border-gray-200">
                    {formatToHours(r.workedDuration)}
                  </td>

                  <td className="p-3 border border-gray-200">
                    {r.breakCount}
                  </td>

                  <td className="p-3 border border-gray-200">
                    {r.totalBreakDuration
                      ? formatToHours(r.totalBreakDuration)
                      : "0 hrs"}
                  </td>

                  <td className="p-3 border border-gray-200">
                    {r.username}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500"
                >
                  No Attendance Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}