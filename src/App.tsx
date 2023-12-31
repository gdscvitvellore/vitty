/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import Template from "./pages/Template";
// import GaurdedRoute from "./components/GuardRoute";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dashboard from "./pages/Dashboard";
// import Loader from "./components/Loader";
import { useAuthStore } from "./store/authStore";
import Profile from "./components/Profile";
// import Timetable from "./pages/TimeTable";
import { useShowProfileStore } from "./store/profileStore";

const App: React.FC = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAGsvEIEPrNKNj_0Z5IzoXBCQQAqEQXG48",
    authDomain: "vitty-dev.firebaseapp.com",
    projectId: "vitty-dev",
    storageBucket: "vitty-dev.appspot.com",
    messagingSenderId: "266303676876",
    appId: "1:266303676876:web:6f8926372803145d457d69",
    measurementId: "G-FC84DREEWX",
  };

  const app = initializeApp(firebaseConfig);
  const { initializeFromLocalStorge, login, isLoggedIn } =
    useAuthStore();
  const { showProfile } = useShowProfileStore()

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user1) => {
      console.log(user1, 'user1');
      if (user1 !== null) {
        console.log(user1);
        localStorage.setItem("uuid", user1.uid);
        localStorage.setItem("profile", user1.photoURL || "");
        localStorage.setItem("name", user1.displayName || "");
        localStorage.setItem("email", user1.email || "");
        login(user1.uid, user1.photoURL || "", user1.displayName || "");
      } else {
        console.log("user is null from app.tsx");
      }
    });
  }, [isLoggedIn, login]);

  useEffect(() => {
    initializeFromLocalStorge();
  }, [initializeFromLocalStorge]);

  useEffect(() => {
    document.title = "VITTY";
  }, []);
  return (
    <Template>
      {isLoggedIn ? <Dashboard /> : <LoginPage />}
      {showProfile &&
          <Profile/>}
    </Template>
  );
};

export default App;
