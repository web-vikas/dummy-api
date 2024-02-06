"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EnterIcon, LockClosedIcon } from "@radix-ui/react-icons";
import React, { FormEvent, useState } from "react";
import { isUserExist } from "./action";
import axios from "axios";
import { useRouter } from "next/navigation";
const page = () => {
  const [isStepOne, setIsStepOne] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailAlreadyExist, setIsEmailAlreadyExist] = useState(false);
  const router = useRouter();
  const continueAction = async (e: FormEvent) => {
    e.preventDefault();
    const res = await isUserExist(email);
    if (res.status) {
      setIsEmailAlreadyExist(true);
      setIsStepOne(false);
    }
  };
  const handelLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:3000/api/user/login`, {
      userName: email,
      password,
    });
    if (res.data.status) {
      router.push("/dashboard");
    }
  };

  return (
    <form
      className={`${
        isStepOne ? "mb-32 md:mb-52" : "mb-16"
      } mx-auto max-w-screen-sm mt-16 `}
      onSubmit={
        !isStepOne && isEmailAlreadyExist ? handelLogin : continueAction
      }
    >
      <h1 className="text-4xl font-extrabold text-center my-10 ">
        Join Fake/api
      </h1>
      <div className="flex flex-col gap-2 mb-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {isStepOne ? (
        <Button onClick={continueAction}>Continue</Button>
      ) : isEmailAlreadyExist ? (
        <LoginForm _this={{ password, setPassword, handelLogin }} />
      ) : (
        <SignUpForm />
      )}
    </form>
  );
};

export default page;

const LoginForm = ({ _this }: any) => {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={_this.password}
          onChange={(e) => _this.setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button type="submit">
          <LockClosedIcon className="mr-3" />
          Login
        </Button>
      </div>
    </div>
  );
};

const SignUpForm = () => {
  return (
    <div>
      <div className="mb-3">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="John Deo" />
      </div>
      <div className="mb-3">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="john" />
      </div>
      <div>
        <Button>
          <EnterIcon className="mr-3" /> Join
        </Button>
      </div>
    </div>
  );
};
