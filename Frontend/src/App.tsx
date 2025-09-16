import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import InvestorRoutes from "./routes/InvestorRoutes";
import { Toaster } from "react-hot-toast";
// import { Toaster } from "sonner"


function App() {
  return (
    <>
      <Toaster />
      
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/investor/*" element={<InvestorRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;