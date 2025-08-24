import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
const UserRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<LandingPage/>} />
            <Route path="/signup" element={<></>} />
        </Routes>
    )
}

export default UserRoutes