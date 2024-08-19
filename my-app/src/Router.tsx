import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import Navigation from 'components/navigation';
import Home from 'pages/Home';
import Movie from 'pages/Movie';
import TV from 'pages/TV';
import Detail from 'pages/Detail';
import Search from 'pages/Search';
import Collection from 'pages/Collection';
import Seasons from 'pages/Seasons';
import Season from 'pages/Season';
import Actor from 'pages/Actor';
import ROUTES from 'constants/routes';

function AppRouter() {
  return (
    <Router>
      <Navigation />
      <Route path={ROUTES.HOME} exact component={Home} />
      <Route path={ROUTES.MOVIES} exact component={Movie} />
      <Route path={ROUTES.MOVIE_DETAIL} component={Detail} />
      <Route path={ROUTES.TVS} exact component={TV} />
      <Route path={ROUTES.TV_DETAIL} component={Detail} />
      <Route path={ROUTES.SEARCH} component={Search} />
      <Route path={ROUTES.COLLECTION} component={Collection} />
      <Route path={ROUTES.SEASONS} exact component={Seasons} />
      <Route path={ROUTES.ACTOR} exact component={Actor} />
      <Route path={ROUTES.SEASON} component={Season} />
      <Redirect from="*" to="/" />
    </Router>
  );
}

export default AppRouter;
