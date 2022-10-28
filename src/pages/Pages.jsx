import Collection from './Collection/Collection';
import Index from './Index/Index';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Router>

  );
};

export default Pages;