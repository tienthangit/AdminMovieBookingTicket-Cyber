import { BrowserRouter, Route, Switch } from "react-router-dom";
import DrawerComponent from "./components/Drawers";
import AddMovie from "./pages/addMovie";
import ShowTimes from "./pages/showTimes";
import EditMovie from "./pages/EditMovie";
import MovieManagement from "./pages/HomeMovie";
import HomeUser from "./pages/HomeUser";
import HomeTemplates from "./templates/HomeTemplates/homeTemplates";
import { AuthRoute } from "./templates/HomeTemplates/RouteHome";
import AuthNotAdmin from "./pages/pageNotAdmin";
import { useDispatch } from "react-redux";
import Login from './pages/Login'
import { GetInfoUserAction } from "./store/actions/loginActions";
import { useEffect } from "react";
import PageNotFound from "./pages/pageNotFound";
import { FirstLogin, PrivateRoute } from "./templates/userTemplates/loginRoute";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetInfoUserAction())
  }, [])


  return (
    <BrowserRouter>
      <DrawerComponent />
      <Switch>
        <FirstLogin path='/' exact Component={Login} RedirectPath="/login"/>
        <PrivateRoute path='/login' exact Component={Login} RedirectPath="/home/movie" />
        <AuthRoute path="/home/movie" exact Component={MovieManagement} RedirectPath="/notadmin" />
        <HomeTemplates path='/home/showtimes/:id/:tenPhim' exact Component={ShowTimes} />
        <HomeTemplates path='/home/movie/addmovie' exact Component={AddMovie} />
        <HomeTemplates path='/home/movie/edit/:id' exact Component={EditMovie} />
        <HomeTemplates path='/home/user' exact Component={HomeUser} />
        <Route path="/login" exact component={HomeTemplates} />
        <Route path="/notadmin" exact component={AuthNotAdmin} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
