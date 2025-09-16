import * as React from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import AxiosInstance from "@/axios/axios"
// import axios from "axios"
// import { Checkbox } from "@/components/ui/checkbox"

// import { useState } from "react"


function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
        fill="currentColor"
      />
    </svg>
  )
}
function EyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M2.81 2.81a1 1 0 0 0-1.41 1.41l3.2 3.2C3.02 8.35 1.68 10.03 1 12c1.73 3.89 6 7 11 7 2.01 0 3.9-.5 5.57-1.37l2.62 2.62a1 1 0 0 0 1.41-1.41L2.81 2.81ZM12 17c-2.76 0-5-2.24-5-5 0-.57.1-1.12.28-1.63l6.35 6.35c-.51.18-1.06.28-1.63.28Zm6.72-2.09-2.2-2.2c.31-.63.48-1.34.48-2.08 0-2.76-2.24-5-5-5-1 0-1.94.3-2.72.81L6.65 4.32C8.25 3.49 10.06 3 12 3c5 0 9.27 3.11 11 7-.71 1.6-1.89 3.02-3.28 3.91Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Zod schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z
    .string()
    .min(5, "At least 8 characters")
  //   .regex(/[a-z]/, "Include a lowercase letter")
  //   .regex(/[A-Z]/, "Include an uppercase letter")
  //   .regex(/[0-9]/, "Include a number"),
  // remember: z.boolean()//.optional().default(false),
})

export type LoginValues = z.infer<typeof loginSchema>
export type PropTypes = { callback: ( values:LoginValues) => void }

export function LoginForm({ callback }:PropTypes) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange",
  })

  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <Card className="border-muted/40 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-lg font-semibold">Sign in</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password with eye toggle */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="********"
              aria-invalid={!!errors.password}
              {...register("password")}
              className="pr-10"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground",
                "hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me + Forgot */}
        <div className="flex items-center justify-between">
          {/* <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={watch("remember")}
              onCheckedChange={(c) => setValue("remember", Boolean(c))}
              aria-label="Remember me"
            />
            <span className="text-muted-foreground">Remember me</span>
          </label> */}
          <Link to="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
            Forgot password?
          </Link>
        </div>
      </CardContent>

      <CardFooter className="grid gap-3">
        <Button
          type="submit"
          onClick={handleSubmit(callback)}
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:opacity-95"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
        {/* <Button variant="outline" asChild className="w-full bg-transparent">
          <Link to="/signup">Create new account</Link>
        </Button> */}
      </CardFooter>
    </Card>
  )
}
