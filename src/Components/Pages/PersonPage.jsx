import { useLocation, Link } from "react-router-dom";
import { useContext, useMemo, useEffect, useState } from "react";
import { AppContext } from "../Contexts/AppContext";

import "../../assets/css/PersonPage.css";

import PartMovieListItem from "../Content/Parts/MovieListItem";

export default function PersonPage() {
  const { personInfo, getPersonInfo, getPersonCredits, personCredits } = useContext(AppContext);
  const location = useLocation();
  const id = location.state;

  useMemo(() => {
    getPersonInfo(id);
    getPersonCredits(id);
  }, [id]);

  useEffect(() => {
    console.log(personCredits);
  }, []);

  return (
    <article id="person-page" className="fade-in app-page">
      <div className="person-page">
        <aside className="person-page-image">
          <img src={`https://image.tmdb.org/t/p/w400${personInfo.profile_path}`} alt={personInfo.name} className="person-image" />
        </aside>
        <div className="person-page-info">
          <h2>{personInfo.name}</h2>
          <h3>Biography</h3>
          <p className="person-bio">{personInfo?.biography?.slice(0, 750)}...</p>
          <div className="person-page-credits">
            <h3>As seen in</h3>
            <ul className="person-page-credits-list">
              {personCredits.cast
                ?.filter((credit) => credit.media_type === "movie")
                ?.sort((a, b) => b.popularity - a.popularity)
                ?.slice(0, 10)
                ?.map((credit, i) => (
                  <li key={i} className="person-page-credits-list-item">
                    <PartMovieListItem movie={credit} />
                  </li>
                ))}
            </ul>
            <h3>Also seen in</h3>
            <ul className="person-page-credits-list-also">
              {personCredits.cast
                ?.filter((credit) => credit.media_type === "movie")
                ?.sort((a, b) => a.title.localeCompare(b.title))
                ?.slice(10)
                ?.map((credit, i) => (
                  <li key={i} className="person-page-credits-list-item">
                    <Link to={`/movie/${credit.id}`} state={credit.id}>
                      <span className="italic">{credit.title}</span>
                      <span>"{credit.character}"</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
