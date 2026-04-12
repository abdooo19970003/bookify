'use client'
import {
  AnyFieldApi,
  useForm,
  StandardSchemaV1,
  Updater,
  DeepValue,
} from '@tanstack/react-form'
import { toast } from 'sonner'
import { ZodType } from 'zod'
import { FieldError, FieldGroup, FieldLabel } from './ui/field'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Field } from './ui/field'
import Link from 'next/link'
import FileUpload from './FileUpload'
import { useRouter } from 'next/navigation'
import { error } from 'console'

interface Props<TData extends Record<string, any>> {
  schema: ZodType<TData>
  defaultValues: TData
  onSubmit: (
    data: TData,
  ) => void | Promise<{ success: boolean; error?: string }>
  type: 'SIGN_IN' | 'SIGN_UP'
  children?: (form: any) => React.ReactNode
}

export default function AuthForm<TData extends Record<string, any>>({
  schema,
  defaultValues,
  onSubmit,
  type,
  children,
}: Props<TData>) {
  const router = useRouter()
  const submitHandler = async (value: TData) => {
    const result = await onSubmit(value)
    if (result?.success) {
      toast.success(
        type === 'SIGN_IN'
          ? 'Signed in successfully!'
          : 'Signed up successfully!',
      )
      router.push('/')
    } else {
      toast.error(
        result?.error?.toString() || 'An error occurred. Please try again.',
      )
    }
    return result
  }
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: schema as StandardSchemaV1<TData, unknown>,
      // onChange: sachema as StandardSchemaV1<TData, unknown>,
    },
    onSubmit: ({ value }) => submitHandler(value as any),
  })
  const isSignIn = type === 'SIGN_IN'
  return (
    <>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-semibold text-white'>
          {isSignIn
            ? 'Welcome Back to Bookify 📚'
            : 'Create Your Bookify Account'}
        </h1>
        <p className='text-light-100'>
          {isSignIn
            ? 'Sign in to access your personalized book recommendations and manage your reading list.'
            : 'Join Bookify today and unlock a world of personalized book recommendations, tailored just for you!'}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className='flex flex-col gap-4'
        >
          {Object.keys(defaultValues).map((key) => (
            <FieldGroup key={key}>
              <form.Field name={key}>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return field.name === 'universityCard' ? (
                    <FileUpload
                      fieldName={field.name}
                      value={field.state.value as string}
                      onChange={(url) =>
                        field.handleChange(
                          url as Updater<DeepValue<TData, string>>,
                        )
                      }
                    />
                  ) : (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        className='capitalize'
                        htmlFor={field.name}
                      >
                        {
                          field.name
                            .replace(/([A-Z])/g, ' $1') // 1. Add space before capital letters
                            .replace(/^./, (str) => str.toUpperCase()) // 2. Capitalize the first letter
                            .trim() // 3. trim whitespace
                        }
                      </FieldLabel>
                      <Input
                        type={
                          key === 'password' || key === 'confirmPassword'
                            ? 'password'
                            : key === 'email'
                              ? 'email'
                              : undefined
                        }
                        id={field.name}
                        name={field.name}
                        value={
                          (field.state.value as
                            | string
                            | number
                            | readonly string[]) ?? ''
                        }
                        onChange={(e) =>
                          field.handleChange(e.target.value as any)
                        }
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        placeholder={`Enter your ${field.name} here...`}
                        required
                        className='form-input'
                      />
                      <FieldError
                        className='text-red-500 text-sm mt-1'
                        errors={field.state.meta.errors}
                      />
                    </Field>
                  )
                }}
              </form.Field>
            </FieldGroup>
          ))}
          {children?.(form)}
          <Button
            type='submit'
            className='form-btn'
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
        <div className='font-medium'>
          {isSignIn && (
            <p className='text-light-100 text-center'>
              Don't have an account?{' '}
              <Link
                href={'/sign-up'}
                className='text-blue-500 hover:underline'
              >
                Sign Up
              </Link>
            </p>
          )}
          {!isSignIn && (
            <p className='text-light-100 text-center'>
              Already have an account?{' '}
              <Link
                href='/sign-in'
                className='text-blue-500 hover:underline'
              >
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.map((err) => err.message).join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}
