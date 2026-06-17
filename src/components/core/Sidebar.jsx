import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { ROUTES } from "../../constants/routes";
import { motion } from "framer-motion";
import SidebarItem from "../ui/SidebarItem";
import { useNavigate } from "react-router-dom";

const Sidebar = (
  {isOpen, onNavigate, activePage}
) => {
  const navigate = useNavigate();
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: isOpen ? 0 : -300, opacity: isOpen ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed left-0 h-full w-60 bg-[#0077b6] text-white shadow-lg z-[900]"
    >
      {/* Dashboard */}
      <SidebarItem
        icon={<FaTachometerAlt />}
        label="Dashboard"
        onClick={() => navigate(ROUTES.DASHBOARD)}
        active={activePage === ROUTES.DASHBOARD}
      />

      <SidebarItem
        icon={<FaUsers />}
        label="HR"
        onClick={() => navigate(ROUTES.HR_DASHBOARD)}
        active={activePage === ROUTES.HR_DASHBOARD}
      />
      <SidebarItem
        icon={<FaUsers />}
        label="Employees"
        onClick={() => navigate(ROUTES.STAFF_DASHBOARD)}
        active={activePage === ROUTES.STAFF_DASHBOARD}
      />
    </motion.aside>
  );
};

export default Sidebar;
