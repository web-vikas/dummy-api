import { LucideLoader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <LucideLoader2 className="animate-spin h-10 w-10 transition-all"/>
    </div>
  );
};

export default loading;
