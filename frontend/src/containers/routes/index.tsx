import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Page404 from '../404';
import Home from '../home';

const RoutesPage: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default RoutesPage;
