"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { login } from "@/lib/authService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const setToken = useAuthStore((s) => s.setToken);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      setToken(token);
      setErrorMessage(""); // Clear error message on successful login
      router.push(nextPath);
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Invalid username or password";
      setErrorMessage(message);
    }
  };

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="flex flex-col items-center justify-center flex-grow relative">
        <h1 className="text-2xl font-bold text-center mb-8">
          Log into your account
        </h1>
        <Card className="w-full max-w-md p-6">
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                if (errorMessage) setErrorMessage("");
                setUsername(e.target.value);
              }}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                if (errorMessage) setErrorMessage("");
                setPassword(e.target.value);
              }}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-[60vh]">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
