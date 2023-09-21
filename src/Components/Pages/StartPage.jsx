import { useContext, useMemo } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { AppContext } from "../Contexts/AppContext";

import "../../assets/css/StartPage.css";

function Navigation() {
  return (
    <nav>
      <ul className="start-page-nav">
        <li>
          <NavLink to="/">Now Playing</NavLink>
        </li>
        <li>
          <NavLink to="upcoming">Upcoming</NavLink>
        </li>
        <li>
          <NavLink to="search">Search</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default function StartPage() {
  const { getNowPlaying, getUpcoming } = useContext(AppContext);

  useMemo(() => {
    getNowPlaying();
    getUpcoming();
  }, []);

  return (
    <article id="start-page">
      <Navigation />
      <Outlet />
    </article>
  );
}
