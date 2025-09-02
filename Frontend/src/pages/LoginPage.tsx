import { Link } from "react-router-dom"
import { LoginForm } from "@/components/Auth/LoginForm"

export default function LoginPage() {
  return (
    <main className="min-h-dvh bg-background">
      <section className="mx-auto grid min-h-dvh w-full max-w-md place-items-center px-4 py-10">
        <div className="w-full">
          {/* Brand */}
          <header className="mb-6 text-center">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
              Welcome back to VentureNest
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to continue building and investing in startups.
            </p>
          </header>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-medium text-primary underline-offset-4 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
