"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signIn, signInWithGoogle, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      
      // Wait for auth state to be ready before redirecting
      // setTimeout(() => {
        //   if (window) {
        //     window.location.href = "/dashboard";
      //   }
      // }, 500);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      await signInWithGoogle();
      
      // // Wait for auth state to be ready before redirecting
      // setTimeout(() => {
      //   if (window) {
      //     window.location.href = "/dashboard";
      //   }
      // }, 500);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to login with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8 mx-auto">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              
              <div className="my-4 text-center text-xs text-muted-foreground uppercase">
                Or continue with
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="size-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
                  <path d="M5.27 14.295C5.02 13.575 4.89999 12.805 4.89999 12C4.89999 11.195 5.02 10.425 5.27 9.705L1.28 6.61C0.47 8.235 0 10.065 0 12C0 13.935 0.47 15.765 1.28 17.39L5.27 14.295Z" fill="#FBBC05"/>
                  <path d="M12.0004 23.9999C15.2354 23.9999 17.9504 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.87043 19.245 6.22043 17.135 5.27039 14.29L1.28039 17.385C3.25539 21.31 7.31043 23.9999 12.0004 23.9999Z" fill="#34A853"/>
                </svg>
                Continue with Google
              </Button>
            </CardContent>
          </form>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-muted-foreground mt-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary underline-offset-4 hover:underline"
              >
                Register
              </Link>
            </div>
            
            <div className="mt-6 p-4 border border-dashed rounded-md border-muted-foreground/50">
              <h3 className="text-sm font-medium mb-2">Test Credentials</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="font-semibold">Admin:</p>
                  <p>admin@test.com</p>
                  <p>123456</p>
                </div>
                <div>
                  <p className="font-semibold">User:</p>
                  <p>user@test.com</p>
                  <p>123456</p>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
} 