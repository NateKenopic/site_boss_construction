"use client";

import Link from "next/link";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import bcrypt from 'bcryptjs';

export function LoginForm() {
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    console.log(e.target);
 
    const formData = new FormData(e.target);
    const email = formData.get('login-email');
    const password = await bcrypt.hash(formData.get('login-password'), 10);
 
    const response = await fetch(process.env.API_URL + 'api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    // if (response.ok) {
    //   router.push('/home');
    // } else {
    //   // Handle errors
    //   router.push('/login');
    // }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={(e) => {handleLogin(e)}} method="post">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your details to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                name="login-email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                name="login-password"
                type="password"
                placeholder="Password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="w-full" type="submit">Login</button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link className="underline ml-2" href="/signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}