"use server";

import EndPointItem, {
  EndpointInfoProps,
} from "@/components/list/endpoint-info";
import axios from "axios";

export const fetchEndpoints = async () => {
  const response = await axios.get(`http://localhost:3000/api/web-vikas/test`);
  return response.data.map((item: EndpointInfoProps) => (
    <EndPointItem
      key={item._id}
      EndpointName={item.EndpointName}
      method={item.method}
    />
  ));
};
