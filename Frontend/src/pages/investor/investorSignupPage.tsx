import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
// import { motion } from "framer-motion";
import { Link } from "react-router-dom"
import OTPModal from "@/components/Modals/OtpModal"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { setData } from "@/store/slice/authDataSlice"
import { useInvestorSignup, useInvestorVerifyOtp } from "@/hook/investorApiHooks"

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

export default function InvestorSignup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isOtpModalOpen, setOtpModalOpen] = useState(false)

  const { mutate: signup, isPending } = useInvestorSignup()
  const { mutate: investorVerifyOtp } = useInvestorVerifyOtp()

  const dispatch = useDispatch<AppDispatch>();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
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
    signup(values, {
      onSuccess: (res) => {
        console.log("response ,", res)
        if (res.message === "Otp sent successfully") {
          setOtpModalOpen(true)
        }
      },
    })
    dispatch(setData({ userName: values.fullName, email: values.email }))
  }

  const handleVerifyOtp = (values: SignupFormValues, otp: string) => {
    investorVerifyOtp(
      { otp, values },
      {
        onSuccess: (res) => {
          if (res.success) {
            alert("Otp verified" + res.data)
            setOtpModalOpen(false)
          }
        },
        onError: (err) => {
          alert("otp verification failed")
          console.log(err)
        },
      },
    )
  }

  function handleVerifyModal(otp: string) {
    handleVerifyOtp(getValues(), otp)
  }

  return (
    <main className="h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">VentureNest</h2>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Where Innovation
              <br />
              <span className="text-blue-200">Meets Investment</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-md">
              Join thousands of ambitious founders and forward-thinking investors building the future together.
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center max-w-lg mx-auto">
            <svg viewBox="0 0 400 300" className="w-full h-auto">
              <g transform="translate(200,150)">
                <ellipse cx="0" cy="0" rx="25" ry="60" fill="white" opacity="0.9" />
                <ellipse cx="0" cy="-10" rx="20" ry="40" fill="#3B82F6" />
                <path d="M-15,-50 Q0,-70 15,-50 Z" fill="white" />
                <circle cx="0" cy="-20" r="8" fill="white" opacity="0.8" />
                <circle cx="0" cy="0" r="6" fill="white" opacity="0.6" />
                <g transform="translate(0,50)">
                  <path d="M-20,0 Q-10,20 0,15 Q10,20 20,0 Q10,25 0,20 Q-10,25 -20,0" fill="#F59E0B" opacity="0.8" />
                  <path d="M-15,5 Q-5,20 0,15 Q5,20 15,5 Q5,22 0,18 Q-5,22 -15,5" fill="#EF4444" opacity="0.7" />
                </g>
              </g>

              <g opacity="0.6">
                <g fill="white">
                  <circle cx="80" cy="60" r="2" />
                  <circle cx="320" cy="80" r="1.5" />
                  <circle cx="350" cy="200" r="2" />
                  <circle cx="50" cy="180" r="1" />
                </g>
                <g transform="translate(100,100)" fill="white" opacity="0.7">
                  <rect x="-8" y="-8" width="16" height="16" rx="3" />
                  <text x="0" y="3" textAnchor="middle" fontSize="10" fill="#3B82F6">
                    $
                  </text>
                </g>
                <g transform="translate(300,180)" fill="white" opacity="0.7">
                  <circle cx="0" cy="0" r="10" />
                  <path d="M-4,-2 L0,4 L4,-2" stroke="#3B82F6" strokeWidth="2" fill="none" />
                </g>
              </g>

              <g stroke="white" strokeWidth="1" opacity="0.3" fill="none">
                <path d="M100,100 Q150,120 200,100" />
                <path d="M200,100 Q250,80 300,100" />
                <path d="M150,200 Q200,180 250,200" />
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-blue-200">Founders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">$2B+</div>
              <div className="text-sm text-blue-200">Invested</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-blue-200">Success Stories</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 lg:px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">VentureNest</h2>
            </div>
          </div>

          {/* <motion.div
              initial={{ opacity: 0, y: 50 }}   // start state
              animate={{ opacity: 1, y: 0 }}    // end state
              transition={{ duration: 0.6, ease: "easeOut" }} // smoothness
              className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
            > */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600" />
            <div className="p-6 sm:p-8">
              <header className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                  Join VentureNest And Fund Great Projects 
                </h1>
                <p className="mt-2 text-sm text-slate-600 text-pretty">
                  Where ambitious founders meet forward-thinking investors. Create your account to get started.
                </p>
              </header>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-2.5 text-white font-medium
                               shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                               disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span className="absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100 bg-white/0 group-hover:bg-white/10" />
                    {isPending ? "Creating Account..." : "Create your account"}
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    By creating an account, you agree to our Terms and Privacy Policy.
                  </p>
                  <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                      to="/investor/login"
                      className="font-medium text-blue-600 hover:text-blue-700 underline decoration-blue-300 hover:decoration-blue-500"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
              <OTPModal isOpen={isOtpModalOpen} onClose={() => setOtpModalOpen(false)} onVerify={handleVerifyModal} />
            </div>
          </div>

          {/* </motion.div> */}
        </div>
      </div>

    </main >
  )
}
