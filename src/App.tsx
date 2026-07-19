import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import Wallets from "./pages/Wallet";
import NewWallet from "./pages/NewWallet";
import Transactions from "./pages/Transactions";
import NewTransaction from "./pages/newTransaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/wallet" element={<Wallets />} />
        <Route path="/newWallet" element={<NewWallet />} />
        <Route path="/transactions" element={<Transactions />} />
         <Route path="/newTransaction" element={<NewTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;