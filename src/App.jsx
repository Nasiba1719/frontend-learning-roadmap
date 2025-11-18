import { useState } from "react";
import UserDashboard from "./components/UserDashboard";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({
    name: "Nesibe Hesenova",
    email: "nesibe@example.com",
    avatarUrl: "https://i.pravatar.cc/120?img=5",
  });

 
  const handleAvatarChange = () => {
    const rnd = Math.floor(Math.random() * 70) + 1;
    setUser((prev) => ({ ...prev, avatarUrl: `https://i.pravatar.cc/120?img=${rnd}` }));
  };

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className={`app ${theme}`}>
      <UserDashboard
        user={user}                 
        theme={theme}
        onToggleTheme={toggleTheme} 
        onChangeAvatar={handleAvatarChange} 
      />
    </div>
  );
} 
