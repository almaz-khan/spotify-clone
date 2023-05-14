import { FC } from "react";
import Login from "@/components/Login";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Login />
    </div>
  );
};

export default page;
