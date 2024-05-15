"use client";

import { CHAT_THEME } from "@/constants/chat-theme";
import { PAGE } from "@/constants/page-paths";
import File from "@/public/file.svg";
import Logo from "@/public/logo.svg";
import Logout from "@/public/logout.svg";
import { fetchUserDetails, logoutUser } from "@/utils/user";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const SideMenu = () => {
  const { data: session,status } = useSession();
  const router = useRouter();
  const [isSignOut, setIsSignOut] = useState<boolean | null>(null);

  useEffect(() => {
    if(status === "unauthenticated" || session === undefined) {
      router.push("/signin");
    }
  },[router, session, status]) 

  const handleSignOut = async () => {
    setIsSignOut(false);
    await signOut({ callbackUrl: "/signin" });
    router.push("/signin");
    await logoutUser();
  };

  return (
    <nav
      className="z-100 w-24 rounded-md flex flex-col items-center fixed]"
      style={{ backgroundColor: CHAT_THEME.SIDE_MENU_BACKGROUND_COLOR }}
    >
      <div className="h-full flex flex-col items-center justify-between mb-4">
        <ul role="list" className="mt-2.5">
          <li
            className="pb-5 border-b"
            role="list-item"
            style={{ borderColor: CHAT_THEME.SIDE_MENU_BORDER_COLOR }}
          >
            <Logo />
          </li>

          <li className="pt-5">
            <Link href={PAGE.PROJECTS}>
              <File />
            </Link>
          </li>
        </ul>

        <ul role="list" className="mt-2.5">
          <li
            className="pb-5 border-b text-center"
            role="list-item"
            style={{ borderColor: CHAT_THEME.SIDE_MENU_BORDER_COLOR }}
          >
            <button aria-label="logout" onClick={() => setIsSignOut(true)}>
              <Logout />
            </button>
          </li>

          <li className="pt-5">
            <div
              className="w-8 h-8 mx-1 rounded-full flex justify-center items-center text-lg uppercase"
              style={{
                backgroundColor: CHAT_THEME.USER_ICON_BACKGROUND_COLOR,
                color: CHAT_THEME.USER_ICON_FONT_COLOR,
              }}
            >
              {session?.user?.name?.charAt(0)}
            </div>
          </li>
        </ul>
      </div>
      {isSignOut && (
        <div className="backdrop-blur-lg bottom-0 h-screen absolute left-24 right-1 flex items-center justify-center z-10">
          <div className="mx-4 w-full max-w-md rounded-lg  p-6 shadow-lg dark:bg-gray-900 sm:p-8 bg-[#191A1F96]">
            <div className="space-y-4 text-center text-[#B3A3FA]">
              <div className="flex justify-center">
                <Logo />
              </div>

              <p className="text-base text-white">
                Are you sure you want to sign out?
              </p>
              <div className="space-x-10">
                <button
                  onClick={() => setIsSignOut(false)}
                  className="hover:text-white underline"
                >
                  Cancel
                </button>
                <Button
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#6846F6] px-6 py-2 text-sm font-medium text-white hover:bg-white hover:text-black "
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SideMenu;
