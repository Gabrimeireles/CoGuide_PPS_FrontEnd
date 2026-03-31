import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import { About } from './components/About';
import { ChatWorkspace } from './components/ChatWorkspace';
import { CoGuide } from './components/CoGuide';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';
import { AuthProvider } from './contexts/authContext';

function MarketingLayout() {
  return (
    <div className="page-shell">
      <Header />
      <main className="page-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AuthLayout() {
  return (
    <div className="auth-shell">
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/coguide" element={<CoGuide />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route path="/chat" element={<ChatWorkspace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
