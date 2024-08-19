import { HashRouter as Router, Route, Navigate } from 'react-router-dom';
import Navigation from '@/components/navigation';
import Home from '@/pages/Home';
import Movie from '@/pages/Movie';
import TV from '@/pages/TV';
import Detail from '@/pages/Detail';
import Search from '@/pages/Search';
import Collection from '@/pages/Collection';
import Seasons from '@/pages/Seasons';
import Season from '@/pages/Season';
import Actor from '@/pages/Actor';
import ROUTES from '@/constants/routes';

function AppRouter() {
  return (
    <Router>
      <Navigation />
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.MOVIES} element={<Movie />} />
      <Route path={ROUTES.MOVIE_DETAIL} element={<Detail />} />
      <Route path={ROUTES.TVS} element={<TV />} />
      <Route path={ROUTES.TV_DETAIL} element={<Detail />} />
      <Route path={ROUTES.SEARCH} element={<Search />} />
      <Route path={ROUTES.COLLECTION} element={<Collection />} />
      <Route path={ROUTES.SEASONS} element={<Seasons />} />
      <Route path={ROUTES.ACTOR} element={<Actor />} />
      <Route path={ROUTES.SEASON} element={<Season />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Router>
  );
}

export default AppRouter;
