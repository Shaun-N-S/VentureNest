import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"

const SignupSchema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name").max(60, "Name is too long"),
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(/[^A-Za-z0-9]/, "Must include at least one symbol"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

type SignupFormValues = z.infer<typeof SignupSchema>

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  })

  const onSubmit = async (values: SignupFormValues) => {
    // Replace with your API call
    console.log("[VentureNest] Signup form submitted:", values)
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Subtle top accent */}
          <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600" />

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Heading */}
            <header className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">Join VentureNest 🚀</h1>
              <p className="mt-2 text-sm text-slate-600 text-pretty">
                Where ambitious founders meet forward-thinking investors. Create your account to get started.
              </p>
            </header>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  aria-invalid={Boolean(errors.fullName)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition
                             focus:border-transparent focus:ring-2 focus:ring-blue-500 hover:border-slate-400"
                  {...register("fullName")}
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="founder@company.com"
                  aria-invalid={Boolean(errors.email)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition
                             focus:border-transparent focus:ring-2 focus:ring-blue-500 hover:border-slate-400"
                  {...register("email")}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    aria-invalid={Boolean(errors.password)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 pr-11 text-slate-900 placeholder:text-slate-400 outline-none transition
                               focus:border-transparent focus:ring-2 focus:ring-blue-500 hover:border-slate-400"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 my-1.5 mr-2.5 grid place-items-center rounded-lg px-2 text-slate-500 hover:text-slate-700 transition"
                  >
                    {showPassword ? (
                      // Eye Off
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-5-9-7 0-.79.36-1.83 1.03-2.93M6.1 6.1C7.98 4.79 9.98 4 12 4c5 0 9 5 9 7 0 .64-.22 1.46-.64 2.33M3 3l18 18M9.88 9.88a3 3 0 104.24 4.24"
                        />
                      </svg>
                    ) : (
                      // Eye
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12 18 19.5 12 19.5 2.25 12 2.25 12z"
                        />
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password ? (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                ) : (
                  <p className="mt-1 text-xs text-slate-500">Use 8+ chars with upper, lower, number, and symbol.</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    aria-invalid={Boolean(errors.confirmPassword)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 pr-11 text-slate-900 placeholder:text-slate-400 outline-none transition
                               focus:border-transparent focus:ring-2 focus:ring-blue-500 hover:border-slate-400"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute inset-y-0 right-0 my-1.5 mr-2.5 grid place-items-center rounded-lg px-2 text-slate-500 hover:text-slate-700 transition"
                  >
                    {showConfirm ? (
                      // Eye Off
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-5-9-7 0-.79.36-1.83 1.03-2.93M6.1 6.1C7.98 4.79 9.98 4 12 4c5 0 9 5 9 7 0 .64-.22 1.46-.64 2.33M3 3l18 18M9.88 9.88a3 3 0 104.24 4.24"
                        />
                      </svg>
                    ) : (
                      // Eye
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12 18 19.5 12 19.5 2.25 12 2.25 12z"
                        />
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-2.5 text-white font-medium
                             shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100 bg-white/0 group-hover:bg-white/10" />
                  {isSubmitting ? "Creating Account..." : "Create your account"}
                </button>
                <p className="mt-3 text-center text-xs text-slate-500">
                  By creating an account, you agree to our Terms and Privacy Policy.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer callout */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700 underline decoration-blue-300 hover:decoration-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
