import { fetchToken } from "../action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Token = async () => {
  const res = await fetchToken();

  return (
    <div className="min-h-64 grid place-content-center">
      <div>
        <Label>Please Copy Your Token</Label>
        <Input value={res.token || res.error} disabled className="mt-2"/>
      </div>
    </div>
  );
};

export default Token;
