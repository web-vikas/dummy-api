import React from "react";
import Image from "next/image";
import signUp from "@/res/image/sign-up.gif";
import createproject1 from "@/res/image/endpointsetup.gif";
import endpoint from "@/res/image/step3.png";
import apiLink from "@/res/image/api-link.png";
import token from "@/res/image/token.gif";
import finalToken from "@/res/image/final token.png";
import final from "@/res/image/finnal.gif";

function Guide() {
  return (
    <div className="mx-5 md:mx-auto max-w-screen-lg">
      <h1 className="text-center mt-10 font-bold text-4xl md:text-6xl font-extra bold">
        How to setup dummy-api <span className="text-red-700">Steps</span>{" "}
      </h1>
      <div className="mt-12 flex items-center justify-center flex-col ">
        <h1 className="mb-2 font-bold text-2xl my-10">
          Step 1: Signup and create project
        </h1>
        <Image
          src={signUp}
          width={750}
          height={750}
          alt="Picture of the author"
          className="rounded-md"
        />
        <p className="my-2 text-xl">
          Step:1 is create account on dummy-api.com and{" "}
          <br className="hidden md:inline-block" />
          Create project names and click project name{" "}
          <span className="text-red-700">Step 2</span>{" "}
        </p>
        <h1 className="mb-2 font-bold text-2xl my-10">Step 2: New EndPoint</h1>
        <Image
          src={endpoint}
          width={750}
          height={750}
          alt="Picture of the author"
          className="rounded-md mb-5"
        />
        <Image
          src={createproject1}
          width={750}
          height={750}
          alt="Picture of the author"
          className="rounded-md"
        />
        <p className="my-2 text-xl">
          After click you New Endpoint and enter endpoint name{" "}
          <span className="text-red-700">endpoint name</span> and{" "}
          <br className="hidden md:inline-block" /> choice your Request Method{" "}
          <span className="text-red-700">GET</span> or{" "}
          <span className="text-red-700">POST</span> and add filds according
          your use <br className="hidden md:inline-block" />
          After <span className="text-red-700">Submit button</span> and click 3
          dot and copy api link
        </p>
        <h1 className="mb-2 font-bold text-2xl my-10">
          Step 3: Copy Link & using
        </h1>
        <Image
          src={apiLink}
          width={750}
          height={750}
          alt="Picture of the author"
          className="rounded-md mt-4"
        />
        <p className="my-2 text-xl">
          After copy link go to token section and copy your token{" "}
          <br className="hidden md:inline-block" />
          past your token end pof url
        </p>
        <Image
          src={token}
          width={750}
          height={750}
          alt="Picture of the author"
          className="rounded-md mt-4"
        />
        <h1 className="mb-2 font-bold text-2xl my-10">Step 4: Final Step</h1>
        <Image
          src={finalToken}
          width={750}
          height={750}
          alt="Picture of the author"
          className="rounded-md mt-4"
        />
        <Image
          src={final}
          width={750}
          height={750}
          alt="Picture of the author"
          className="rounded-md mt-4"
        />
        <p className="my-2 text-xl">
          {" "}
          After past end of url on your token and{" "}
          <span className="text-red-700">
            yourtoken&limit=10 or according yourtoken need
          </span>
        </p>
      </div>
    </div>
  );
}

export default Guide;
