import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import SignUpPage from '@/pages/SignUpPage'
import LoginPage from '@/pages/LoginPage'
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