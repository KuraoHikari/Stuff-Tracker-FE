import { UserAuthForm } from "@/components/user-auth-form";

import { useCallback, useState } from "react";

export type Variant = "LOGIN" | "REGISTER";
const AuthLayout = () => {
 const [variant, setVariant] = useState<Variant>("LOGIN");

 const toggleVariant = useCallback(() => {
  if (variant === "LOGIN") {
   setVariant("REGISTER");
  } else {
   setVariant("LOGIN");
  }
 }, [variant]);
 return (
  <>
   <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div className="flex flex-col space-y-2 text-center">
     <h1 className="text-2xl font-semibold tracking-tight">
      {variant === "REGISTER" ? "Create an account" : "Login to the app"}
     </h1>
     <p className="text-sm text-muted-foreground">
      {" "}
      {variant === "REGISTER"
       ? "Enter your email below to create your account"
       : "Enter your email and password to login in to your account"}
     </p>
    </div>
    <UserAuthForm toggleVariant={toggleVariant} />
    <p className="px-8 text-center text-sm text-muted-foreground">
     By clicking continue, you agree to our{" "}
     <div>
      <span className="underline underline-offset-4 hover:text-primary">
       Terms of Service
      </span>{" "}
      and{" "}
      <span className="underline underline-offset-4 hover:text-primary">
       Privacy Policy
      </span>
     </div>
    </p>
   </div>
  </>
 );
};

export default AuthLayout;
