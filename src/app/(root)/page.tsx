import { Card } from "@/components/ui/card";
import { CodeIcon } from "@radix-ui/react-icons";
import React from "react";

const Page = () => {
  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h4 className="text-xs font-extrabold">FOR DEVELOPER</h4>
        <p className="text-2xl  text-red-400 font-bold my-3">
          Build apps fast.
        </p>
        <div className="max-w-lg mx-auto break-words">
          <p className="text-wrap text-base  text-center">
            Get your backend done in minutes instead of weeks. <br /> Easily
            build customizable content API and use them with a modern tech stack
            i am developer
          </p>
        </div>
      </div>
      <div className="w-full md:w-7/12 m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
        <Card className=" flex p-3 gap-3 hover:bg-secondary cursor-pointer">
          <div className="text-center">
            <CodeIcon className="h-10 w-10" />
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold mb-3">Open Source</h2>
            <p className="text-sm opacity-75">
              Forever. The entire codebase is available on GitHub and maintained
              by hundreds of contributors Get your backend done in minutes
              instead of weeks. Easily build customizable content API.
            </p>
          </div>
        </Card>
        <Card className=" flex p-3 gap-3 hover:bg-secondary cursor-pointer">
          <div className="text-center">
            <CodeIcon className="h-10 w-10" />
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold mb-3">Open Source</h2>
            <p className="text-sm opacity-75">
              Forever. The entire codebase is available on GitHub and maintained
              by hundreds of contributors Get your backend done in minutes
              instead of weeks. Easily build customizable content API.
            </p>
          </div>
        </Card>
        <Card className=" flex p-3 gap-3 hover:bg-secondary cursor-pointer">
          <div className="text-center">
            <CodeIcon className="h-10 w-10" />
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold mb-3">Open Source</h2>
            <p className="text-sm opacity-75">
              Forever. The entire codebase is available on GitHub and maintained
              by hundreds of contributors Get your backend done in minutes
              instead of weeks. Easily build customizable content API.
            </p>
          </div>
        </Card>
        <Card className=" flex p-3 gap-3 hover:bg-secondary cursor-pointer">
          <div className="text-center">
            <CodeIcon className="h-10 w-10" />
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold mb-3">Open Source</h2>
            <p className="text-sm opacity-75">
              Forever. The entire codebase is available on GitHub and maintained
              by hundreds of contributors Get your backend done in minutes
              instead of weeks. Easily build customizable content API.
            </p>
          </div>
        </Card>
      </div>
      <div>
        <div>
          <h4 className="text-xs font-extrabold text-center mt-5">
            STEP-BY-STEP GUIDE
          </h4>
          <p className="text-2xl text-red-400 font-bold my-3 text-center">
            How does it work?
          </p>
          <div className="max-w-lg mx-auto break-words mb-16">
            <p className="text-wrap text-base text-center">
              Make a flexible data structure in 2 minutes. Use our powerful
              features to customize your API. I am developer
            </p>
          </div>
          <div className="p-4 flex flex-col sm:flex-row justify-around  gap-8">
            <div className="sm:w-1/2">
              <p className="mb-8">Step 1</p>
              <h2 className="mb-8 w-[400px] text-2xl  font-semibold">
                Effortlessly create content structures that flex to your needs.
              </h2>
              <p className="text-base opacity-75">
                No matter which data structure is the best for your business,
                you can easily define models and add relations to create rich
                layout experiences.
                <br /> No matter which data structure is the best for your
                business,
                <br /> you can easily define models and add relations to create
                rich layout experiences.
              </p>
            </div>
            <div className="sm:w-1/2">
              <img
                src="./strapi-img.png"
                alt="loading"
                className="mx-auto h-5/6 w-5/6"
              />
            </div>
          </div>
          <div className="p-4 flex flex-col-reverse sm:flex-row justify-around  gap-8">
            <div className="sm:w-1/2">
              <img
                src="./strapi-img.png"
                alt="loading"
                className="mx-auto h-5/6 w-5/6"
              />
            </div>
            <div className="sm:w-1/2">
              <p className="mb-8">Step 1</p>
              <h2 className="mb-8 w-[400px] text-2xl font-semibold">
                Effortlessly create content structures that flex to your needs.
              </h2>
              <p className="text-base opacity-75">
                No matter which data structure is the best for your business,
                you can easily define models and add relations to create rich
                layout experiences.
                <br /> No matter which data structure is the best for your
                business,
                <br /> you can easily define models and add relations to create
                rich layout experiences.
              </p>
            </div>
          </div>
          <div className="p-4 flex flex-col sm:flex-row justify-around  gap-8">
            <div className="sm:w-1/2">
              <p className="mb-8">Step 1</p>
              <h2 className="mb-8 w-[400px] text-2xl font-semibold">
                Effortlessly create content structures that flex to your needs.
              </h2>
              <p className="text-base opacity-75">
                No matter which data structure is the best for your business,
                you can easily define models and add relations to create rich
                layout experiences.
                <br /> No matter which data structure is the best for your
                business,
                <br /> you can easily define models and add relations to create
                rich layout experiences.
              </p>
            </div>
            <div className="sm:w-1/2">
              <img
                src="./strapi-img.png"
                alt="loading"
                className="mx-auto h-5/6 w-5/6"
              />
            </div>
          </div>
          <div className="p-4 flex flex-col-reverse sm:flex-row justify-around  gap-8">
            <div className="sm:w-1/2">
              <img
                src="./strapi-img.png"
                alt="loading"
                className="mx-auto h-5/6 w-5/6"
              />
            </div>
            <div className="sm:w-1/2">
              <p className="mb-8">Step 1</p>
              <h2 className="mb-8 w-[400px] text-2xl font-semibold">
                Effortlessly create content structures that flex to your needs.
              </h2>
              <p className="text-base opacity-75">
                No matter which data structure is the best for your business,
                you can easily define models and add relations to create rich
                layout experiences.
                <br /> No matter which data structure is the best for your
                business,
                <br /> you can easily define models and add relations to create
                rich layout experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
