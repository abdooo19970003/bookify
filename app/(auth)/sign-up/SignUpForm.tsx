"use client";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validation";
const SignUpForm = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      fullName: "",
      email: "",
      universityId: 0,
      universityCard: "",
      password: "",
      confirmPassword: "",
    }}
  />
);
export default SignUpForm;
