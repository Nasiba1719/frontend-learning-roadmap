import UserProfile from "./UserProfile";
import ThemeToggle from "./ThemeToggle";

export default function UserDashboard({ user, theme, onToggleTheme, onChangeAvatar }) {
  return (
    <section className="card">
      <header className="row-between">
        <h2>User Dashboard</h2>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </header>
      <UserProfile user={user} onChangeAvatar={onChangeAvatar} />
    </section>
  );
}
