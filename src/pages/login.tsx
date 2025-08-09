/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { post } from "../lib/api";
import LockIcon from "../assets/icon/lock-icon.svg"; // optional
import "../styles/login.scss";
import Image from "next/image";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = await post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setMsg("Logged in");
    } catch (err: any) {
      setMsg(err?.data?.message || err?.message || "Login failed");
    }
  }

  return (
    <div className="container">
    <div className="glitch-form-wrapper">
      <form className="glitch-card" onSubmit={handleSubmit}>
        <div className="card-header">
          <div className="card-title">
            <Image src={LockIcon} alt="Secure Icon" width={24} height={24} />
            <span>SECURE_DATA</span>
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
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />
            <label
              htmlFor="email"
              className="form-label"
              data-text="USERNAME"
            >
              USERNAME
            </label>
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
            <label
              htmlFor="password"
              className="form-label"
              data-text="ACCESS_KEY"
            >
              ACCESS_KEY
            </label>
          </div>

          <button
            type="submit"
            className="submit-btn"
            data-text="INITIATE_CONNECTION"
          >
            <span className="btn-text">INITIATE_CONNECTION</span>
          </button>
           <h6>Don&apos;t have an account? <Button onClick={()=>router.push("/signup")}>Sign up</Button></h6>

          {msg && (
            <p
              style={{ marginTop: "1rem", color: "lime", textAlign: "center" }}
            >
              {msg}
            </p>
          )}
        </div>
      </form>
    </div>
    </div>
  );
}
