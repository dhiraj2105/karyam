import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ClientAuthForm from "./Components/AuthForm/ClientAuthForm";
import WorkerAuthForm from "./Components/AuthForm/WorkerAuthForm";
import AuthPage from "./pages/Auth/AuthPage";
import WorkerLoginForm from "./Components/AuthForm/WorkerLoginForm";
import { useEffect, useState } from "react";
import WorkerProfile from "./Components/Profile/WorkerProfile";
import ClientProfile from "./Components/Profile/ClientProfile";
import ClientLoginForm from "./Components/AuthForm/ClientLoginForm";
import Cart from "./pages/Cart/Cart";
import UpdateWorker from "./Components/UpdateWorker/UpdateWorker";
// import { getClientById } from "./api/clientAPI";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState(null);

  const [workerData, setWorkerData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [user, setUser] = useState(null);

  const [cart, setCart] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const Role = localStorage.getItem("role");
    const id = localStorage.getItem("id");

    if (token && Role && id) {
      setIsAuthenticated(true);
      setRole(Role);

      // fetch  profile data
      if (Role === "worker") {
        const fetchWorker = async () => {
          const response = await fetch(`workers/${localStorage.getItem("id")}`);
          const data = await response.json();
          setWorkerData(data);
        };
        fetchWorker();
        // console.log("Worker Data from App.js --> ", workerData);
      } else if (Role === "client") {
        const fetchClient = async () => {
          const response = await fetch(`clients/${localStorage.getItem("id")}`);
          const data = await response.json();
          setClientData(data);
        };
        fetchClient();
        // console.log("Client Data from App.js --> ", clientData);
      }

      // Prop for Home/Navbar
      if (Role === "client") {
        setUser(clientData);
      } else if (Role === "worker") {
        setUser(workerData);
      }
    }
  }, []);

  //cart
  // Load cart data from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (worker) => {
    setCart((prevCart) => [...prevCart, worker]);
  };

  const removeFromCart = (workerId) => {
    setCart((prevCart) => prevCart.filter((worker) => worker._id !== workerId));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    setIsAuthenticated(false);
    setRole("");
    setProfile(null);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isAuthenticated={isAuthenticated}
              role={role}
              onLogout={handleLogout}
              userData={user}
              cart={cart}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        {/* Clients */}
        <Route path="/auth/clientRegister" element={<ClientAuthForm />} />
        <Route path="/auth/clientLoginForm" element={<ClientLoginForm />} />
        <Route
          path="/clientProfile"
          element={
            <ClientProfile client={clientData} onLogout={handleLogout} />
          }
        />
        {/* Workers */}
        <Route path="/auth/workerRegister" element={<WorkerAuthForm />} />
        <Route path="/auth/workerLoginForm" element={<WorkerLoginForm />} />
        <Route
          path="/workerProfile"
          element={
            <WorkerProfile worker={workerData} onLogout={handleLogout} />
          }
        />
        <Route
          path="/updateWorker"
          element={<UpdateWorker workerId={workerData} />}
        />

        {/* <Route
          path="profile"
          element={role === "worker" ? <WorkerProfile /> : <ClientProfile />}
        /> */}
        <Route
          path="/cart"
          element={
            <Cart cart={cart} removeFromCart={removeFromCart} client={user} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
