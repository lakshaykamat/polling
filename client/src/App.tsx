import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import ApprovedAppointments from "./pages/ApprovedAppointments";
import RejectedAppointments from "./pages/RejectedAppointments";
import "./index.css";

const App: React.FC = () => {
  const { user } = useAuth();
  // const [cssLoaded, setCssLoaded] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     const loadCss = async () => {
  //       if (user.role === "Teacher") {
  //         await import("./teacher.css");
  //         console.log("Teacher CSS loaded");
  //       } else {
  //         await import("./index.css");
  //         console.log("Student CSS loaded");
  //       }
  //       setCssLoaded(true);
  //     };
  //     loadCss();
  //   }
  // }, [user]);

  // if (!user) {
  //   return <div>Loading...</div>; // Or a more sophisticated loading spinner
  // }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <ProtectedRoute exact path="/" component={HomePage} />
            {user && user.role === "Teacher" && (
              <>
                <ProtectedRoute
                  exact
                  path="/approved"
                  component={ApprovedAppointments}
                />
                <ProtectedRoute
                  exact
                  path="/rejected"
                  component={RejectedAppointments}
                />
              </>
            )}
            <Redirect to="/" />
          </Switch>
          <Toaster />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
