import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import HomeTemplate from "./template/HomeTemplate";
import MainPage from "./pages/Home/MainPage/MainPage";
import FilmDetail from "./pages/Home/FilmDetail/FilmDetail";
import Schedule from "./pages/Home/Schedule/Schedule";
import BookTicket from "./pages/Home/BookTicket/BookTicket";
import AdminTemplate from "./template/AdminTemplate";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AdminAddFilm from "./pages/Admin/Film/AdminAddFilm/AdminAddFilm";
import AdminFilm from "./pages/Admin/Film/AdminFilm/AdminFilm";
import AdminEditFilm from "./pages/Admin/Film/AdminEditFilm/AdminEditFilm";
import AdminUser from "./pages/Admin/User/AdminUser/AdminUser";
import AdminAddUser from "./pages/Admin/User/AdminAddUser/AdminAddUser";
import AdminEditUser from "./pages/Admin/User/AdminEditUser/AdminEditUser";
import AdminShowTime from "./pages/Admin/ShowTime/AdminShowTime/AdminShowTime";
import AdminAddShowTime from "./pages/Admin/ShowTime/AdminAddShowTime/AdminAddShowTime";
import HomeLogin from "./pages/Home/HomeLogin/HomeLogin";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {/* -----------HOME--------------------- */}
          <HomeTemplate exact path="/" component={MainPage} />
          <HomeTemplate exact path="/detail" component={FilmDetail} />
          <HomeTemplate exact path="/schedule" component={Schedule} />
          <HomeTemplate exact path="/ticket" component={BookTicket} />
          <Route exact path="/login" component={HomeLogin} />

          {/*--------------- ADMIN ---------------- */}
          {/* Admin Login */}
          <Route exact path="/admin/login" component={AdminLogin} />

          {/* Admin MainPage*/}
          <AdminTemplate exact path="/admin" component={AdminDashboard} />
          <AdminTemplate
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />

          {/* Admin Film */}
          <AdminTemplate exact path="/admin/film" component={AdminFilm} />
          <AdminTemplate
            exact
            path="/admin/film/add"
            component={AdminAddFilm}
          />
          <AdminTemplate
            exact
            path="/admin/film/edit"
            component={AdminEditFilm}
          />

          {/* Admin User */}
          <AdminTemplate exact path="/admin/film/user" component={AdminUser} />
          <AdminTemplate
            exact
            path="/admin/film/user/add"
            component={AdminAddUser}
          />
          <AdminTemplate
            exact
            path="/admin/film/user/edit"
            component={AdminEditUser}
          />
        </Switch>
        {/* Admin ShowTime */}
        <AdminTemplate
          exact
          path="/admin/film/showtime"
          component={AdminShowTime}
        />
        <AdminTemplate
          exact
          path="/admin/film/showtime/add"
          component={AdminAddShowTime}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
