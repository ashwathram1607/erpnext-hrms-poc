import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaUserCog,
  FaChartLine,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaCalendarTimes
} from "react-icons/fa";

export default function HRDashboard() {
  const navigate = useNavigate();

  const boxes = [
    {
      title: "Recruitment",
      desc: "Manage job postings, candidate applications, and hiring pipelines.",
      color: "from-blue-500 to-indigo-600",
      icon: <FaUserPlus className="text-2xl text-white" />,
      path: "/hr-dashboard/recruitment",
      modulesCount: "4 Modules"
    },
    {
      title: "Employee Lifecycle",
      desc: "Track employee onboarding, transitions, promotions, and offboarding.",
      color: "from-teal-500 to-emerald-600",
      icon: <FaUserCog className="text-2xl text-white" />,
      path: "/hr-dashboard/employee-lifecycle",
      modulesCount: "7 Modules"
    },
    {
      title: "Performance",
      desc: "Monitor employee goals, performance reviews, and feedback.",
      color: "from-amber-500 to-orange-600",
      icon: <FaChartLine className="text-2xl text-white" />,
      path: "/hr-dashboard/performance",
      modulesCount: "5 Modules"
    },
    {
      title: "Shift & Attendance",
      desc: "Monitor shift rosters, check-in logs, and attendance summaries.",
      color: "from-violet-500 to-purple-600",
      icon: <FaCalendarCheck className="text-2xl text-white" />,
      path: "/hr-dashboard/shift-attendance",
      modulesCount: "4 Modules"
    },
    {
      title: "Expense Claims",
      desc: "Process travel, business, and employee expense claims.",
      color: "from-rose-500 to-pink-600",
      icon: <FaFileInvoiceDollar className="text-2xl text-white" />,
      path: "/hr-dashboard/expense-claims",
      modulesCount: "6 Modules"
    },
    {
      title: "Leaves",
      desc: "Manage leave applications, balances, and supervisor approvals.",
      color: "from-sky-500 to-blue-600",
      icon: <FaCalendarTimes className="text-2xl text-white" />,
      path: "/hr-dashboard/leaves",
      modulesCount: "4 Modules"
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-[calc(100vh-40px)] flex flex-col items-center justify-start py-12 px-6 sm:px-12 relative overflow-hidden bg-slate-50/50">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-200/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header section */}
      <div className="text-center max-w-2xl mb-12 z-10">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 mb-4">
          Human Resource System
        </h1>
        <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed">
          Manage employee lifecycle, shift schedules, performance metrics, and claims through a unified SaaS control panel.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl z-10">
        {boxes.map((box, i) => (
          <motion.div
            key={box.title}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{
              y: -5,
              scale: 1.015,
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.03), 0 8px 10px -6px rgb(0 0 0 / 0.03)",
            }}
            onClick={() => navigate(box.path)}
            className="bg-white/80 backdrop-blur-md border border-slate-200/60 hover:border-indigo-200 rounded-2xl p-6 flex flex-col justify-between items-start text-left cursor-pointer transition-colors duration-300 w-full relative overflow-hidden group min-h-[220px]"
          >
            {/* Hover bottom border glow effect */}
            <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r ${box.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

            <div className="w-full">
              {/* Header inside card */}
              <div className="flex items-center justify-between w-full mb-4">
                {/* Icon Container */}
                <div className={`bg-gradient-to-br ${box.color} p-3 rounded-xl text-white shadow-md shadow-indigo-100/10 group-hover:scale-105 transition-transform duration-300`}>
                  {box.icon}
                </div>
                {/* Badge count */}
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600 border border-slate-200/40">
                  {box.modulesCount}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-950 transition-colors duration-300">
                {box.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {box.desc}
              </p>
            </div>

            {/* CTA text link at bottom */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors duration-300 mt-auto">
              <span>Explore Modules</span>
              <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}