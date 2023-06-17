import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
  getLocalStorageTheme,
  getUserLogged,
  login,
  putAccessToken,
  putLocalStorageTheme,
  register,
  removeAccessToken,
} from "./utils/network-data";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const navigate = useNavigate();
  const [user, setUser, loading] = useUserData(navigate);
  const [theme, toggleTheme] = useTheme();

  const onLoginHandler = async (email, password) => {
    const res = await login({ email, password });
    if (!res.error) {
      putAccessToken(res.data.accessToken);
      const loggedIn = await getUserLogged();
      setUser(loggedIn.data.name);
      navigate("/home");
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
    removeAccessToken();
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <>
        {" "}
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app">
        <Routes>
          <Route
            path="/home"
            element={<Home onLogOutHandler={onLogOutHandler} user={user} />}
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
            element={
              <Register onRegisterHandler={onRegisterHandler} user={user} />
            }
          />
          <Route
            path="/login"
            element={<Login onLoginHandler={onLoginHandler} user={user} />}
          />
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

const useTheme = () => {
  const [theme, setTheme] = useState(getLocalStorageTheme() || "light");

  useEffect(() => {
    const app = document.getElementById("root");
    if (theme === "dark") {
      return app.classList.add("dark");
    }
    return app.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      putLocalStorageTheme("dark");
    } else {
      setTheme("light");
      putLocalStorageTheme("light");
    }
  };

  return [theme, toggleTheme];
};

const useUserData = (navigate) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getAccessToken()) {
      getUserAsync();
    } else {
      navigate("/login");
      setLoading(false);
    }
  }, [user]);

  const getUserAsync = async () => {
    const res = await getUserLogged();
    if (!res.error) {
      setUser(res.data.name);
    } else {
      removeAccessToken();
    }
    setLoading(false);
  };

  return [user, setUser, loading];
};

export default App;
