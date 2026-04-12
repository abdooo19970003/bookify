'use client'
import AuthForm from '@/components/AuthForm'
import { signUpAction } from '@/lib/actions/auth'
import { signUpSchema } from '@/lib/validation'
const SignUpForm = () => (
  <AuthForm
    type='SIGN_UP'
    schema={signUpSchema}
    defaultValues={{
      fullName: '',
      email: '',
      universityId: 0,
      universityCard: '',
      password: '',
      confirmPassword: '',
    }}
    onSubmit={(data) =>
      signUpAction(data) as Promise<{ success: boolean; error?: string }>
    }
  />
)
export default SignUpForm
