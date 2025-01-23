import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../modules/main/home";
import Test from "../modules/main/test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
