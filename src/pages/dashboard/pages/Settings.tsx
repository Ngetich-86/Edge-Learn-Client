import { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa"; // Icon for the "cupcake" theme

const ThemeToggle = () => {
  const themes = ["light", "dark", "cupcake"];
  const [theme, setTheme] = useState(themes[0]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Cycle through the themes
  const toggleTheme = () => {
    setTheme((prev) => {
      const currentIndex = themes.indexOf(prev);
      return themes[(currentIndex + 1) % themes.length];
    });
  };

  // Icon based on the theme
  const getIcon = () => {
    if (theme === "light") return <MdLightMode size={14} />;
    if (theme === "dark") return <MdDarkMode size={14} />;
    if (theme === "cupcake") return <FaBirthdayCake size={14} />;
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center text-success bg-gray-900 btn btn-secondary"
    >
      {getIcon()}
      {/* <span className="capitalize">{theme} Mode</span> */}
    </button>
  );
};

export default ThemeToggle;
