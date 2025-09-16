import InvestorLoginPage from "@/pages/investor/InvestorLoginPage"
import InvestorSignup from "@/pages/investor/investorSignupPage"
import { Route, Routes } from "react-router-dom"

const InvestorRoutes = () => {
    return (
        <Routes>
            <Route path="/signup" element={<InvestorSignup />} />
            <Route path="/login" element={<InvestorLoginPage />} />
        </Routes>
    )
}

export default InvestorRoutes