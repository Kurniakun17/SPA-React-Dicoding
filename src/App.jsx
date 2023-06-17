import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { DetailMemo } from "./pages/DetailMemo";
import { NotFound } from "./pages/NotFound";
import { NewMemo } from "./pages/NewMemo";
import { Archived } from "./pages/Archived";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { useEffect, useState } from "react";
import {
  getAccessToken,
  getUserLogged,
  login,
  putAccessToken,
  register,
  userLogOut,
} from "./utils/network-data";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (getAccessToken()) {
      getUserAsync();
    }

    if (user) {
      return navigate("/home");
    }
    return navigate("/login");
  }, [user]);

  const getUserAsync = async () => {
    const res = await getUserLogged();
    if (!res.error) {
      setUser(res.data.name);
    }
    setLoading(false);
  };

  const onLoginHandler = async (email, password) => {
    const res = await login({ email, password });

    if (!res.error) {
      putAccessToken(res.data.accessToken);
      const loggedIn = await getUserLogged();
      setUser(loggedIn.data.name);
      return;
    }
  };

  const onRegisterHandler = async (name, email, password) => {
    const res = await register({ name, email, password });

    if (!res.error) {
      navigate("/login");
    }
  };

  const onLogOutHandler = () => {
    userLogOut();
    setUser("");
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/home"
          element={<Home onLogOutHandler={onLogOutHandler} />}
        />
        <Route path="/addmemo" element={<NewMemo />} />
        <Route
          path="/memo/:id"
          element={<DetailMemo onLogOutHandler={onLogOutHandler} />}
        />
        <Route
          path="/archived"
          element={<Archived onLogOutHandler={onLogOutHandler} />}
        />
        <Route
          path="/register"
          element={<Register onRegisterHandler={onRegisterHandler} />}
        />
        <Route
          path="/login"
          element={<Login onLoginHandler={onLoginHandler} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
