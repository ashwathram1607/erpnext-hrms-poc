import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import DialogBox from "./DialogBox";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [dialog, setDialog] = useState({ isOpen: false, message: "" });

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  // ✅ Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data) => {
    const res = await api.post(
      "/api/method/login",
      {
        usr: data.Email,
        pwd: data.Password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
      return res.data; // { access_token, user: { ... } }
    },

    onSuccess: (data) => {
      console.log("✅ User Data:", data);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("full_name", data.full_name);
      setDialog({ isOpen: true, message: "Login successful!" });
      setFormData({ Email: "", Password: "" });
      setTimeout(() => navigate("/dashboard"), 1000);
    },

    onError: (error) => {
      console.error("❌ Login failed:", error);
      setDialog({ isOpen: true, message: "Login failed. Please try again." });
    },
  });

  // ✅ Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <>
      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
      <DialogBox
        isOpen={dialog.isOpen}
        message={dialog.message}
        onClose={() => setDialog({ isOpen: false, message: "" })}
      />
    </>
  );
}
