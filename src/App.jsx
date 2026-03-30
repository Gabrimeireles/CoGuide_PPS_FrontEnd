
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import { About } from './components/About';
import { Chat } from './components/Chat';
import { CoGuide } from './components/CoGuide';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Sidebar } from './components/Sidebar';
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';

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

function ChatLayout() {
  return (
    <div className="chat-shell">
      <Sidebar />
      <Chat />
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

          <Route path="/chat" element={<ChatLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
