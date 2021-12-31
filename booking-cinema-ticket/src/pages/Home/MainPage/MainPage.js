import React, { useEffect } from "react";
import FilmCarousel from "../../../components/Home/FilmCarousel/FilmCarousel";
import HomeCarouselBanner from "../../../components/Home/HomeCarouselBanner/HomeCarouselBanner";
import { listFilm } from "../../../data";
import _ from "lodash";
const MainPage = (props) => {
  // TODO lifecycle
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main>
      <HomeCarouselBanner />
      <FilmCarousel
        history={props.history}
        header="Phim đang chiếu"
        listPhim={_.filter(listFilm, (item) => item.dangChieu === true)}
      />
      <FilmCarousel
        header="Phim sắp chiếu"
        listPhim={_.filter(listFilm, (item) => item.sapChieu === true)}
      />
      <h1 className="uppercase text-xl text-center my-14">Tin tức</h1>
      <div className="grid grid-rows-2 grid-cols-4 gap-4 container">
        <div
          className="row-span-2 col-span-2 h-screen bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://znews-photo.zadn.vn/w1200/Uploaded/fssyy/2021_11_13/4.jpg)",
          }}
        ></div>
        <div
          className="col-span-1 bg-cover bg-top"
          style={{
            backgroundImage:
              "url(https://marvelphim.com/wp-content/uploads/2021/11/560-sony-tung-poster-da%CC%82%CC%80u-tie%CC%82n-cho-phim-spider-man-no-way-home.jpg)",
          }}
        ></div>
        <div
          className="col-span-1 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://znews-photo.zadn.vn/w1200/Uploaded/fssyy/2021_09_26/squidgameunit1031076_res_16325402021261064250606.jpg)",
          }}
        ></div>
        <div
          className="col-span-2 bg-cover bg-top h-56"
          style={{
            backgroundImage:
              "url(https://znews-photo.zadn.vn/w1200/Uploaded/fssyy/2021_11_13/4.jpg)",
          }}
        ></div>
      </div>
      <div className="flex justify-center mt-8">
        <button className="self-center px-7 py-2 font-semibold rounded bg-red-500 text-white hover:bg-red-600 active:bg-red-500">
          Xem thêm
        </button>
      </div>
    </main>
  );
};

export default MainPage;
