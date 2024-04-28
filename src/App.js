import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Alert from './component/layout/Alert';
import Info from './component/layout/Info';
import Home from './component/pages/Home';
import About from './component/pages/About';
import User from './component/pages/User';
import NotFound from './component/pages/NotFound';
import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';
import { InfoProvider } from './context/info/InfoContext';

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <InfoProvider>
          <Router>
            <div className="flex flex-col justify-between h-screen">
              <Navbar />
              <main className='container mx-auto px-3'>
                <Alert />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/user/:login' element={<User />} />
                  <Route path='/notfound' element={<NotFound />} />
                  <Route path='/*' element={<NotFound />} />
                </Routes>
                <Info />
              </main>
              <Footer />
            </div>
          </Router>
        </InfoProvider>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
