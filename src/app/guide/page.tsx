import React from "react";
import Image from "next/image";
import signUp from "@/res/image/signup.png";
import createproject from "@/res/image/create-project.gif";
import createproject1 from "@/res/image/create-project-1.png";
import endpoint from "@/res/image/step3.png";
import endpoint2 from "@/res/image/endpoint2.png";
import endpoint3 from "@/res/image/endpoint3.png";
import endpoint4 from "@/res/image/endpoint4.png";
import apiLink from "@/res/image/api-link.png";
import token from "@/res/image/token.png";
import finalToken from "@/res/image/final token.png";

function Guide() {
  return (
    <div className="mx-auto max-w-screen-lg">
      <h1 className="text-center mt-5 font-bold font-7xl">
        How to create dummy-api <span className="text-red-700">Steps</span>{" "}
      </h1>
      <div className="mt-10">
        <center>
          <div className="mt-5 items-end justify-end">
            <h1 className="mb-2 font-bold">Step 1: Signup or Login</h1>
            <Image
              src={signUp}
              width={750}
              height={750}
              alt="Picture of the author"
              className="rounded-md"
            />
            <p className="my-2 text-lx">
              First create account on dummy-api.com and <br />
              Create project names and follow{" "}
              <span className="text-red-700">Step 2</span>{" "}
            </p>
            <h1 className="my-5 font-bold">Step 2: Create project</h1>
            <Image
              src={createproject}
              width={750}
              height={750}
              alt="Picture of the author"
              className="rounded-md"
            />
            <p className="my-2">
              After create Project and click your project name <br /> and
              follows <span className="text-red-700">Step 3</span>{" "}
            </p>
            <Image
              src={createproject1}
              width={750}
              height={750}
              alt="Picture of the author"
              className="rounded-md"
            />
            <h1 className="my-5 font-bold">Step 3: New EndPoint</h1>
            <Image
              src={endpoint}
              width={750}
              height={750}
              alt="Picture of the author"
              className="rounded-md"
            />
            <p className="my-2">
              After click your project name choice{" "}
              <span className="text-red-700">endpoint name</span> and <br />{" "}
              choice your Request Method{" "}
              <span className="text-red-700">GET</span> or{" "}
              <span className="text-red-700">POST</span>{" "}
            </p>
            <Image
              src={endpoint2}
              width={750}
              height={750}
              alt="Picture of the author"
              className="rounded-md mt-4"
            />
            <p className="my-2">
              After choice your deta <span className="text-red-700">GET</span>{" "}
              or <span className="text-red-700">POST</span> Click on Add Field{" "}
            </p>
            <Image
              src={endpoint3}
              width={750}
              height={750}
              alt="Picture of the author"
              className="rounded-md mt-4"
            />
            <p className="my-2">
              After Click on <span className="text-red-700">Add Field</span>{" "}
              choice your data acording your usegess <br />{" "}
              <span className="text-red-700">
                Example:- name, username, number, email and more
              </span>{" "}
            </p>
            <Image
              src={endpoint4}
              width={750}
              height={750}
              alt="Picture of the author"
              className="rounded-md mt-4"
            />
            <p className="my-2">
              After choice acording your usegess on Click{" "}
              <span className="text-red-700">Submit button</span>
            </p>
            <h1 className="my-5 font-bold">Step 4: Copy Link & using</h1>
            <Image
              src={apiLink}
              width={750}
              height={750}
              alt="Picture of the author"
              className="rounded-md mt-4"
            />
            <p className="my-2">
              After <span className="text-red-700">Submit button</span> click 3
              dot and copy link
            </p>
            <Image
              src={token}
              width={550}
              height={550}
              alt="Picture of the author"
              className="rounded-md mt-4"
            />
            <p className="my-2">After copy your token id</p>
            <Image
              src={finalToken}
              width={750}
              height={750}
              alt="Picture of the author"
              className="rounded-md mt-4"
            />
            <p className="my-2">And use api ezay way and fast</p>
          </div>
        </center>
      </div>
    </div>
  );
}

export default Guide;
