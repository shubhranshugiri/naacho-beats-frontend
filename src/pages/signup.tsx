/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { post } from "../lib/api";
import { Button, Typography } from "@mui/material";
import LockIcon from "../assets/icon/lock-icon.svg"; // optional
import "../styles/login.scss";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const router = useRouter();
    const getPasswordStrength = (password: string): string => {
    if (password.length < 8) return "Weak";

    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    if (hasUpper && hasNumber && hasSpecial) return "Strong";
    if ((hasUpper && hasNumber) || (hasNumber && hasSpecial)) return "Moderate";

    return "Weak";
  };

    const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isStrongPassword = (password: string): boolean => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
      password
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
        // Basic validation
    if (!email && !password) {
      setMessage("Username and password cannot be empty");
      return;
    }
    if (!password) {
      setMessage("password cannot be empty");
      return;
    }
    if (!email) {
      setMessage("Username cannot be empty");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    if (!isStrongPassword(password)) {
      setMessage(
        "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long"
      );
      return;
    }
    try {
      await post("/auth/signup", { email, password, name });
      setMessage("Signup success. Check email to verify.");
    } catch (err: any) {
      setMessage(err?.data?.message || err?.message || "Signup failed");
    }
  }

  return (
    <div className="container">
    <div className="glitch-form-wrapper">
      <form className="glitch-card" onSubmit={handleSubmit}>
        <div className="card-header">
          <div className="card-title">
            <Image src={LockIcon} alt="Secure Icon" width={24} height={24} />
            <span>CREATE_ACCOUNT</span>
          </div>
          <div className="card-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
            />
            <label
              htmlFor="name"
              className="form-label"
              data-text="USERNAME"
            >
              NAME
            </label>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />
            <label
              htmlFor="email"
              className="form-label"
              data-text="USERNAME"
            >
              EMAIL
            </label>
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
                setPasswordStrength(getPasswordStrength(val));
              }}
              placeholder=""
            />
            <label
              htmlFor="password"
              className="form-label"
              data-text="CREATE_KEY"
            >
              CREATE_KEY
            </label>
            {password && (
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.9rem",
                  color:
                    passwordStrength === "Strong"
                      ? "limegreen"
                      : passwordStrength === "Moderate"
                      ? "orange"
                      : "crimson",
                  textAlign: "left",
                }}
              >
                Strength: {passwordStrength}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            data-text="CREATE_ACCOUNT"
          >
            <span className="btn-text">CREATE_ACCOUNT</span>
          </button>
          <Typography variant="body2">
            Already have an account? <Button onClick={()=>router.push("/login")}>Sign up</Button>
          </Typography>
          {message && (
            <p
              style={{ marginTop: "1rem", color: "lime", textAlign: "center" }}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
    </div>
  );
}
