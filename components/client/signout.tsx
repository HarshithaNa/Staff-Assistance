"use client";
import { logoutUser } from "@/utils/user";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { fetchUserDetails } from "@/utils/user";
import { useSession } from "next-auth/react";
const SignInPopUp = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleSignOut = async () => {
    
    if(status == "authenticated" && session.user) {
      console.log("authenticated")
    const { signOut } = await import("next-auth/react");
    await signOut({ redirect: false });
    }
    router.push("/signin");
    const userDetail = await fetchUserDetails();
    console.log("user detail",userDetail.name)
    // if (userDetail.name) {
      await logoutUser();
    //}
  };

  return (
    <div className="bg-stone-950 bottom-0 h-screen absolute left-24 right-1 flex items-center justify-center">
      <div className="mx-4 w-full max-w-md rounded-md border border-[#B3A3FA]  p-6 shadow-lg dark:bg-gray-900 sm:p-8">
        <div className="space-y-4 text-center text-[#B3A3FA]">
          <h3 className="text-2xl font-bold">Do you want to logout? </h3>
          {/* <p>Redirecting to signin page</p> */}
          <Button
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#6846F6] px-6 py-2 text-sm font-medium text-white hover:bg-white hover:text-black "
            onClick={handleSignOut}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPopUp;
