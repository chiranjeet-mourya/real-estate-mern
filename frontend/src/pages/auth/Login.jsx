import React, { useState } from "react";
import { loginStyles as s } from "../../assets/dummyStyles";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/common/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  //   submit data and login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);
    if (result.success) {
      const storeUser = JSON.parse(
        localStorage.getItem("user") || sessionStorage.getItem("user"),
      );
      if (storeUser?.role === "admin") {
        navigate("/admin-dashboard");
      } else if (storeUser?.role === "seller") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={s.pageContainer}>
      <Navbar />

      <div className={s.containerCenter}>
        <div className={s.card}>
          <h2 className={s.title}>Welcome Back</h2>
          <p className={s.subtitle}>
            Please enter your credentials to access your account.
          </p>
          {error && <div className={s.errorAlert}>{error}</div>}

          <form onSubmit={handleSubmit} className={s.form}>
            <div>
              <label className={s.label}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                className={s.input}
                required
              />
            </div>
            <div>
              <div className={s.passwordHeader}>
                <label className={s.label}>Password</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="******"
                  value={formData.password}
                  className={s.input}
                  onChange={handleChange}
                  required
                  style={{ paddingRight: "40px" }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
              <Link
                to="/forgot-password"
                className={`${s.forgotLink} cursor-pointer flex justify-end mt-1`}
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className={s.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign IN"}
            </button>
          </form>
          <p className={s.footerText}>
            Don't have an account?{" "}
            <Link to="/register" className={s.registerLink}>
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
