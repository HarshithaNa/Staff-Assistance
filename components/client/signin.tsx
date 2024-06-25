"use client";

import Logo from "@/public/logo.svg";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { postUser, refreshAccessToken } from "@/utils/user";
import { useRouter } from "next/navigation";
import { CHATINTERFACE } from "@/constants/chat-bot";
import GoogleLogo from "@/public/google.svg";
import { CHAT_THEME } from "@/constants/chat-theme";

const SignInComponent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && status === "authenticated") {
      fetchData();
    }
  }, [session, status]);

  const fetchData = async () => {
    try {
      if (status) {
       await postUser(session?.user?.email || " ");
        router.push("/chat-bot");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn(CHATINTERFACE.CHAT_SIGNIN);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-items-center items-center">
      <div className="absolute top-[156px] flex gap-4 items-end">
        <Logo />
        <h1
          className=" text-3xl font-bold mb-[-6px]"
          style={{ color: CHAT_THEME.FONT_COLOR }}
        >
          Staff Assistant
        </h1>
      </div>

      <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
        <h2
          className="mb-10 text-center text-3xl  font-bold"
          style={{ color: CHAT_THEME.FONT_COLOR }}
        >
          Sign in to access your account
        </h2>
        <button
          className="flex w-full  max-w-sm h-full max-h-20  rounded p-0.5 font-bold text-white"
          style={{ backgroundColor: CHAT_THEME.BUTTON_BACKGROUND_COLOR }}
          onClick={() => handleGoogleSignIn()}
        >
          <div className="bg-white  h-full max-h-20 mr-16 rounded">
            <GoogleLogo />
          </div>
          <div className="py-4 text-xl"> Sign in with Google</div>
        </button>
      </div>
    </div>
  );
};

export default SignInComponent;
