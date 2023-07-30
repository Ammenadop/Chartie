import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/Navbar";
import Chart from "./pages/Chart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./propectedRoute/protected";
import Protect from "./propectedRoute/protect";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Chart />}></Route>
            </Route>
            <Route element={<Protect />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
