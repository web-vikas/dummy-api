import { Button } from "@/components/ui/button";
import React from "react";
import { fetchToken } from "../action";

const Token = async () => {
  const res = await fetchToken();

  return <div>{res.token || res.error}</div>;
};

export default Token;
