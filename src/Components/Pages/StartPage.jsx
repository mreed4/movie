import { useContext, useMemo } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { AppContext } from "../Contexts/AppContext";

import "../../assets/css/StartPage.css";

export default function StartPage() {
  const { getNowPlaying, getUpcoming } = useContext(AppContext);

  useMemo(() => {
    getNowPlaying();
    getUpcoming();
  }, []);

  return (
    <article id="start-page">
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Now Playing
            </NavLink>
          </li>
          <li>
            <NavLink to="upcoming">Upcoming</NavLink>
          </li>
          <li>
            <NavLink to="search">Search</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </article>
  );
}
