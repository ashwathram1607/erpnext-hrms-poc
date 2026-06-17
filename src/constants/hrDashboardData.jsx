import React from "react";
import {
  FaUserPlus,
  FaUserCog,
  FaChartLine,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaCalendarTimes,
  FaRegFileAlt
} from "react-icons/fa";

export const sublinkData = {
  recruitment: {
    title: "Recruitment",
    icon: <FaUserPlus className="text-xl" />,
    color: "from-blue-500 to-indigo-600",
    sections: [
      {
        title: "Jobs",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Staffing Plan",
          "Job Requisition",
          "Job Opening",
          "Job Applicant",
          "Job Offer",
          "Employee Referral"
        ]
      },
      {
        title: "Interviews",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Interview Type",
          "Interview Round",
          "Interview",
          "Interview Feedback"
        ]
      },
      {
        title: "Appointment",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Appointment Letter Template",
          "Appointment Letter"
        ]
      },
      {
        title: "Reports",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Recruitment Analytics"
        ]
      }
    ]
  },
  "employee-lifecycle": {
    title: "Employee Lifecycle",
    icon: <FaUserCog className="text-xl" />,
    color: "from-teal-500 to-emerald-600",
    sections: [
      {
        title: "Onboarding",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Employee Onboarding Template",
          "Employee Onboarding",
          "Employee Skill Map"
        ]
      },
      {
        title: "Journey",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Employee Promotion",
          "Employee Transfer"
        ]
      },
      {
        title: "Grievance",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Grievance Type",
          "Employee Grievance"
        ]
      },
      {
        title: "Training",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Training Program",
          "Training Event",
          "Training Feedback",
          "Training Result"
        ]
      },
      {
        title: "Exit",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Employee Separation Template",
          "Employee Separation",
          "Full and Final Settlement",
          "Exit Interview"
        ]
      },
      {
        title: "Daily Work Summary",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Daily Work Summary",
          "Daily Work Summary Group",
          "Daily Work Summary Replies"
        ]
      },
      {
        title: "Reports",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Employee Exits",
          "Employee Birthday",
          "Employee Information",
          "Employee Analytics"
        ]
      }
    ]
  },
  performance: {
    title: "Performance",
    icon: <FaChartLine className="text-xl" />,
    color: "from-amber-500 to-orange-600",
    sections: [
      {
        title: "Masters",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Appraisal Template",
          "KRA",
          "Employee Feedback Criteria"
        ]
      },
      {
        title: "Appraisal",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Appraisal",
          "Appraisal Cycle",
          "Employee Performance Feedback",
          "Goal"
        ]
      },
      {
        title: "Energy Points",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Energy Point Rule",
          "Energy Point Settings",
          "Energy Point Log"
        ]
      },
      {
        title: "Promotion",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Employee Promotion"
        ]
      },
      {
        title: "Reports",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Appraisal Overview"
        ]
      }
    ]
  },
  "shift-attendance": {
    title: "Shift & Attendance",
    icon: <FaCalendarCheck className="text-xl" />,
    color: "from-violet-500 to-purple-600",
    sections: [
      {
        title: "Shifts",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Shift Type",
          "Shift Assignment",
          "Shift Request"
        ]
      },
      {
        title: "Attendance",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Attendance",
          "Attendance Request",
          "Employee Checkin",
          "Employee Attendance Tool",
          "Upload Attendance"
        ]
      },
      {
        title: "Time",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Timesheet",
          "Activity Type"
        ]
      },
      {
        title: "Reports",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Monthly Attendance Sheet",
          "Employee Hours Utilization Based On Time...",
          "Project Profitability",
          "Employees working on a holiday"
        ]
      }
    ]
  },
  "expense-claims": {
    title: "Expense Claims",
    icon: <FaFileInvoiceDollar className="text-xl" />,
    color: "from-rose-500 to-pink-600",
    sections: [
      {
        title: "Claims",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Expense Claim",
          "Expense Claim Type"
        ]
      },
      {
        title: "Advances",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Employee Advance",
          "Payment Entry",
          "Journal Entry",
          "Additional Salary"
        ]
      },
      {
        title: "Fleet Management",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Vehicle",
          "Driver",
          "Vehicle Service Item",
          "Vehicle Log",
          "Vehicle Expenses"
        ]
      },
      {
        title: "Travel",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Travel Request",
          "Purpose of Travel"
        ]
      },
      {
        title: "Reports",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Employee Advance Summary",
          "Unpaid Expense Claim",
          "Vehicle Expenses"
        ]
      },
      {
        title: "Accounting Reports",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Accounts Receivable",
          "Accounts Payable",
          "General Ledger"
        ]
      }
    ]
  },
  leaves: {
    title: "Leaves",
    icon: <FaCalendarTimes className="text-xl" />,
    color: "from-sky-500 to-blue-600",
    sections: [
      {
        title: "Setup",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Holiday List",
          "Leave Type",
          "Leave Period",
          "Leave Policy",
          "Leave Block List"
        ]
      },
      {
        title: "Allocation",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Leave Allocation",
          "Leave Policy Assignment",
          "Leave Encashment"
        ]
      },
      {
        title: "Application",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Leave Application",
          "Compensatory Leave Request"
        ]
      },
      {
        title: "Reports",
        icon: <FaRegFileAlt className="text-slate-700 text-lg" />,
        items: [
          "Employee Leave Balance",
          "Employee Leave Balance Summary",
          "Employees working on a holiday"
        ]
      }
    ]
  }
};
