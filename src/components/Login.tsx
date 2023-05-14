"use client";

import { signIn } from "next-auth/react";
import { FC } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  return (
    <button
      className="text-white px-8 py-2 rounded-full bg-green-500 font-bold text-lg"
      onClick={() => signIn("spotify")}
    >
      Login with spotify
    </button>
  );
};

export default Login;
