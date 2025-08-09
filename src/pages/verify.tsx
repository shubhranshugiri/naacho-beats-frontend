/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/verify.tsx
import { get } from "@/lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Verify() {
  const router = useRouter();
  const { token } = router.query;
  const [msg, setMsg] = useState<string>("Verifying...");
  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const res = await get(`/auth/verify-email?token=${token}`);

        if (res.ok) {
          setMsg(res.message || "Email verified successfully. You may now login.");
          
        } else {
          setMsg(res.message || "Invalid or expired token.");
        }
        setTimeout(() => router.push("/login"), 3000);
      } catch (err:any) {
        console.log(err)
        setTimeout(() => router.push("/login"), 3000);
        setMsg(err?.data.message || "Server error. Please try again later.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <main style={{ padding: 20 }}>
      <h1>Email Verification</h1>
      <p>{msg}</p>
    </main>
  );
}
