import Collection from './Collection/Collection';
import Index from './Index/Index';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Pages = () => {

  // console.log('defaultURL: ', defaultUrl);

  return (
    <Router>
      <Routes>
        <Route path='/collections/:category_id/:page' element={<Index />} />
        <Route path='/collection/:id' element={<Collection />} />
        <Route path='*' element={<Navigate to='/collections/0/1' />} />
      </Routes>
    </Router>

  );
};

export default Pages;