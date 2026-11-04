"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PasswordInput  from "@/components/password-input";
import  GoogleButton  from "@/components/google-button";

import { getNextPath } from "@/lib/redirect";
const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const parsed = loginSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email(parsed.data);
    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }
    toast.success("Welcome back! You are now logged in.");
    router.push(getNextPath());
    router.refresh();
  };

  return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border border-border shadow-xs">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>
            Login to join events and make a difference
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={() => toast.info("This feature is coming soon")}
                  className="cursor-pointer text-xs font-medium text-[#934B00] transition-colors hover:underline hover:text-[#7A3E00] dark:text-primary dark:hover:text-[#F7B267]"
                >
                  Forgot password?
                </button>
              </div>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="h-10 w-full font-semibold shadow-xs"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            OR
            <div className="h-px flex-1 bg-border" />
          </div>

          <GoogleButton />
        </CardContent>

        <CardFooter className="justify-center text-sm text-muted-foreground">
          New to GiveHand?&nbsp;
          <Link
            href="/register"
            className="font-semibold text-[#934B00] transition-colors hover:underline hover:text-[#7A3E00] dark:text-primary dark:hover:text-[#F7B267]"
          >
            Register here
          </Link>
        </CardFooter>
      </Card>
    </div>

  );
};

export default LoginPage;