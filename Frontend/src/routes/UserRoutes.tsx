import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPages/LandingPage'
import SignUpPage from '@/pages/user/authentication/SignUpPage'
import LoginPage from '@/pages/user/authentication/UserLoginPage'
const UserRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    )
}

export default UserRoutes