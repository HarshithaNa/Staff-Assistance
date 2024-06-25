import { CHAT_THEME } from "@/constants/chat-theme";
import Logo from "@/public/logo.svg";
import { logoutUser } from "@/utils/user";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const AdminPopUp = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/signin" });
    router.push("/signin");
    await logoutUser();
  };

  return (
    <div className="w-full flex items-center justify-center h-[calc(100vh_-_48px)]">
      <div className="w-full max-w-[383px] flex flex-col items-center ">
        <Logo />
        <p className="text-2xl font-medium text-white text-center mb-5 mt-8">
          Sorry, You’re not an admin
        </p>
        <p className="text-[#C8C8C8] font-normal text-base text-center">
          You do not have necessary permissions to access this page
        </p>
        <Button
          className="inline-flex h-10 w-full max-w-32 items-center justify-center rounded-md p-4 text-sm font-normal text-white  mt-20 "
          style={{ backgroundColor: CHAT_THEME.BUTTON_BACKGROUND_COLOR }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminPopUp;
