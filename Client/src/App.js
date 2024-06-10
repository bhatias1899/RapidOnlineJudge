import "./App.css";
import "./global.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePageComponent from "./Components/HomePageComponent/HomePageComponent";
import Dashboard from "./Components/DashBoard/Dashboard";
import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
import ProfileComponent from "./Components/ProfileComponent/ProfileComponent";
import { useSelector } from "react-redux";
import ProblemComponent from "./Components/ProblemComponent/ProblemComponent";

function App() {
  const user = useSelector((state) => state.user.userData);
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={HomePageComponent} />
            <Route path="/login" Component={HomePageComponent} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/problem/*"
              element={
                <PrivateRoute>
                  <ProblemComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/compiler"
              element={
                <PrivateRoute>
                  <ProblemComponent onlyCompiler={true} />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
