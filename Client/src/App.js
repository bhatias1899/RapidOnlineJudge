import "./App.css";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageComponent from "./Components/HomePageComponent/HomePageComponent";
import Dashboard from "./Components/DashBoard/Dashboard";
import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
import ProfileComponent from "./Components/ProfileComponent/ProfileComponent";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
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
                  <ProfileComponent/>
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
