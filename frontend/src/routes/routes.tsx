import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import Home from '../pages/Home/Home';
import Header from '../components/Header/Header';
import User from '../pages/User/User';
import Room from '../pages/Room/Room';

const RoutesPage: FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/room" element={<Room />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default RoutesPage;
