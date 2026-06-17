import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { sublinkData } from "../../constants/hrDashboardData";

const categoryDescriptions = {
  recruitment: "Manage talent pipelines, candidate interviews, staffing requests, and onboarding letters.",
  "employee-lifecycle": "Oversee employee onboarding, transitions, promotion templates, exit procedures, and training logs.",
  performance: "Conduct appraisal cycles, track employee goals, gather feedback, and review energy points.",
  "shift-attendance": "Coordinate daily check-ins, request logs, shift assignments, and timesheet logs.",
  "expense-claims": "Monitor travel expenses, employee advances, accounting ledgers, and vehicle tracking logs.",
  leaves: "Configure leave policies, allocation rules, application pipelines, and balances."
};

export default function HRSubDashboard() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const currentCategory = sublinkData[category?.toLowerCase()];

  if (!currentCategory) {
    return (
      <div className="min-h-[calc(100vh-40px)] flex flex-col items-center justify-center p-4 bg-slate-50/50">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center max-w-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Category Not Found</h2>
          <p className="text-slate-500 mb-6">The requested HR category could not be resolved.</p>
          <button
            onClick={() => navigate(ROUTES.HR_DASHBOARD)}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow transition"
          >
            Back to HR Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Filter sections and items based on search input
  const filteredSections = currentCategory.sections.map(section => {
    const matchedItems = section.items.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      ...section,
      items: matchedItems
    };
  }).filter(section => section.items.length > 0);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-[calc(100vh-40px)] flex flex-col items-center justify-start py-12 px-6 sm:px-12 relative overflow-hidden bg-slate-50/50">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-200/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-7xl flex flex-col items-start z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(ROUTES.HR_DASHBOARD)}
          className="flex items-center gap-2 text-indigo-950 font-bold hover:text-indigo-600 transition-colors mb-6 group cursor-pointer"
        >
          <FaArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </button>

        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 pb-6 mb-8 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className={`bg-gradient-to-br ${currentCategory.color} p-2.5 rounded-xl text-white shadow-sm`}>
              {currentCategory.icon}
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-extrabold text-indigo-950">
                {currentCategory.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-lg">
                {categoryDescriptions[category?.toLowerCase()] || "Manage modules and view category analytics."}
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search modules..."
              className="w-full pl-9 pr-12 py-2 bg-white border border-slate-200 focus:border-indigo-400 focus:bg-white text-sm text-slate-700 rounded-xl outline-none transition-all text-left shadow-sm"
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {filteredSections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 w-full text-center bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/50">
            <p className="text-slate-400 font-semibold text-sm">No modules found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-bold"
            >
              Clear Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 w-full">
            {filteredSections.map((section, i) => (
              <motion.div
                key={section.title}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{
                  y: -3,
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.03), 0 4px 6px -4px rgb(0 0 0 / 0.03)",
                }}
                className="bg-white/80 backdrop-blur-md border border-slate-200/60 hover:border-indigo-200 rounded-2xl p-6 flex flex-col justify-start items-start text-left w-full relative overflow-hidden group transition-colors duration-300"
              >
                {/* Hover bottom border glow effect */}
                <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r ${currentCategory.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

                <div className="w-full mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    {/* Section Icon container */}
                    <div className={`bg-gradient-to-br ${currentCategory.color} p-2.5 rounded-xl text-white shadow-sm shadow-indigo-100/10 group-hover:scale-105 transition-transform duration-300`}>
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-950 transition-colors duration-300">
                      {section.title}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600 border border-slate-200/40">
                    {section.items.length} {section.items.length === 1 ? 'Module' : 'Modules'}
                  </span>
                </div>

                {/* Subcards for each item rendered in a responsive grid inside the full-width section card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-2">
                  {section.items.map((item) => (
                    <div
                      key={item}
                      onClick={() => setAlertMessage(item)}
                      className="bg-white/90 border border-slate-200/50 hover:border-indigo-300 rounded-xl p-4 flex flex-col justify-between items-start text-left cursor-pointer transition-all duration-300 w-full relative overflow-hidden group/item shadow-sm hover:shadow hover:-translate-y-0.5 min-h-[120px]"
                    >
                      {/* Hover bottom border glow effect */}
                      <div className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r ${currentCategory.color} transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left`} />

                      <span className="text-xs sm:text-sm text-slate-700 font-bold group-hover/item:text-indigo-600 transition-colors leading-snug">
                        {item}
                      </span>

                      {/* Footer inside subcard */}
                      <div className="flex items-center justify-between w-full mt-3 border-t border-slate-100/50 pt-2">
                        <span className="text-[10px] font-bold text-slate-400 group-hover/item:text-indigo-600 transition-colors">Open Module</span>
                        <svg className="w-3 h-3 text-slate-300 group-hover/item:text-indigo-600 group-hover/item:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Feature Coming Soon Toast */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-5 right-5 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 border border-slate-800"
          >
            <span className="text-xl">ℹ️</span>
            <div className="text-left">
              <p className="font-semibold text-sm">Feature Coming Soon</p>
              <p className="text-xs text-slate-400">The {alertMessage} is not implemented yet.</p>
            </div>
            <button
              onClick={() => setAlertMessage(null)}
              className="ml-4 text-slate-400 hover:text-white text-xs font-bold"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
