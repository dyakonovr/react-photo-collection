import Collection from './Collection/Collection';
import Index from './Index/Index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/collection' element={<Collection />} />
      </Routes>
    </Router>
  );
};

export default Pages;