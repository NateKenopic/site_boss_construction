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

export function SignupForm() {
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    console.log(e.target);
 
    const formData = new FormData(e.target);
    const username = formData.get('signup-username');
    const email = formData.get('signup-email');
    const password = await bcrypt.hash(formData.get('signup-password'), 10);
 
    const response = await fetch(process.env.API_URL + 'api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
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
      <form onSubmit={(e) => {handleSignup(e)}} method="post">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-username">Username</Label>
              <Input
                id="signup-username"
                name="signup-username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                name="signup-email"
                type="email"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                name="signup-password"
                type="password"
                placeholder="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="w-full" type="submit">Sign Up</button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="/login">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}