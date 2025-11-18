export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="btn ghost" onClick={onToggle}>
      Theme: {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
