import type { ReactNode } from "react"

type FormWrapperProps = {
  title: string
  children: ReactNode
}

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {title}
      </h2>
      <div className="grid gap-4">
        {children}
      </div>
    </>
  )
}
