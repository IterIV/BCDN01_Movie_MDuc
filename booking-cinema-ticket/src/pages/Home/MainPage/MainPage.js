import React from "react";
import FilmCarousel from "../../../components/Home/FilmCarousel/FilmCarousel";
import HomeCarouselBanner from "../../../components/Home/HomeCarouselBanner/HomeCarouselBanner";
import { listFilm } from "../../../data";
import _ from "lodash";
const MainPage = () => {
  return (
    <main>
      <HomeCarouselBanner />
      <FilmCarousel
        header="Phim đang chiếu"
        listPhim={_.filter(listFilm, (item) => item.dangChieu === true)}
      />
      <FilmCarousel
        header="Phim sắp chiếu"
        listPhim={_.filter(listFilm, (item) => item.sapChieu === true)}
      />
    </main>
  );
};

export default MainPage;
