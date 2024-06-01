import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx"; // Import the Login component

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/login" element={<Login />} /> {/* Add the login route */}
      </Routes>
    </Router>
  );
}

export default App;
