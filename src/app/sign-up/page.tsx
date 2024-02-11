import { SignUpForm } from "./signup-form";

const Page = () => {
  return (
    <div className="mb-16 mx-auto max-w-screen-sm mt-16 max-sm:p-5">
        <h1 className="text-4xl font-extrabold text-center my-10 ">
        Join fake/api
      </h1>
      <SignUpForm />
    </div>
  );
};

export default Page;
