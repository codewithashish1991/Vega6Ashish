import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/user/login';
import Register from './components/user/register';
import BlogList from './components/blogs/list';
import BlogDetails from './components/blogs/details';
import AddBlog from './components/blogs/add';
import Header from './components/common/header';
import Footer from './components/common/footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/blog-add" element={<AddBlog />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;