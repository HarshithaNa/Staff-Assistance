import SignInComponent from "@/components/client/signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Assistant | Signin",
  description: "Login to use the ai powered staff assistant",
};

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignInComponent />
    </div>
  );
};

export default SignIn;
