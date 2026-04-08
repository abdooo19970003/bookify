"use client";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validation";

const SignInForm = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
  />
);

export default SignInForm;
