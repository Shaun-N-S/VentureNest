import { useMultiStepForm } from "@/hook/useMultiStepForm"
import { useDispatch, useSelector } from "react-redux"
import { updateForm, resetForm } from "../../../store/slice/User/authSlice"
import { UserForm } from "./UserForm"
import { AddressForm } from "./AddressForm"
import { AccountForm } from "./AccountForm"
import type { FormEvent } from "react"

const SignUp = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.form)

    function updateFields(fields: Partial<typeof data>) {
        dispatch(updateForm(fields))
    }

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
        useMultiStepForm([
            <UserForm {...data} updateFields={updateFields} />,
            <AddressForm {...data} updateFields={updateFields} />,
            <AccountForm {...data} updateFields={updateFields} />,
        ])

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        if (!isLastStep) return next()
        alert("✅ Successful Account Creation")
        dispatch(resetForm())
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="relative bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="absolute top-4 right-4 text-gray-500 font-medium">
                        {currentStepIndex + 1} / {steps.length}
                    </div>

                    {step}

                    <div className="flex justify-between">
                        {!isFirstStep && (
                            <button
                                type="button"
                                onClick={back}
                                className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                        >
                            {isLastStep ? "Finish" : "Next"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
