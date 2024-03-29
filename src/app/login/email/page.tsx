import { LoginForm } from "./login-form";
const EmailLogin = () => {
  return (
    <div className="mb-16 mx-auto max-w-screen-sm mt-16">
      <h1 className="text-4xl max-sm:text-2xl font-extrabold text-center my-10 ">
        Login to fake/api
      </h1>
      <LoginForm />
    </div>
  );
};

export default EmailLogin;
