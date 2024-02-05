"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EnterIcon, LockClosedIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const page = () => {
  const [isStepOne, setIsStepOne] = useState(true);
  const [isEmailAlreadyExist, setIsEmailAlreadyExist] = useState(false);
  return (
    <div
      className={`${
        isStepOne ? "mb-32 md:mb-52" : "mb-16"
      } mx-auto max-w-screen-sm mt-16 `}
    >
      <h1 className="text-4xl font-extrabold text-center my-10 ">
        Join Fake/api
      </h1>
      <div className="mb-3">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="email@gmail.com" />
      </div>
      {isStepOne ? (
        <Button onClick={() => setIsStepOne(false)}>Continue</Button>
      ) : isEmailAlreadyExist ? (
        <LoginForm />
      ) : (
        <SignUpForm />
      )}
    </div>
  );
};

export default page;

const LoginForm = () => {
  return (
    <div>
      <div className="mb-3">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="********" />
      </div>
      <div>
        <Button>
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
