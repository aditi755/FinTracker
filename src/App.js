
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/Signup";
import Header from './components/Header';
import { ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
     <ToastContainer /> 
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  
  </>
  );
}
export default App;
