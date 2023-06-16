import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { DetailMemo } from "./pages/DetailMemo";
import { NotFound } from "./pages/NotFound";
import { NewMemo } from "./pages/NewMemo";
import { Archived } from "./pages/Archived";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/addmemo" element={<NewMemo />} />
        <Route path="/memo/:id" element={<DetailMemo />} />
        <Route path="/archived" element={<Archived />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
