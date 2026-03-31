import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import brand from '/src/assets/brand.png';
import { useAuth } from '/src/contexts/authContext';
import { ThemeToggle } from '/src/components/ThemeToggle';

const navigationItems = [
  { label: 'Plataforma', to: '/coguide' },
  { label: 'Contato', to: '/contact' },
  { label: 'Sobre', to: '/about' },
];

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b" style={{ borderColor: 'var(--line)', backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)' }}>
      <div className="mx-auto flex w-[min(1200px,calc(100%-2.5rem))] items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={brand} alt="CoGuide logo" className="h-10 w-10 rounded-xl border p-1" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--text-muted)' }}>
              Copiloto eSocial
            </p>
            <p className="text-lg font-extrabold">CoGuide</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-semibold transition ${isActive ? 'border' : 'hover:opacity-90'}`
              }
              style={({ isActive }) =>
                isActive
                  ? { borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }
                  : { color: 'var(--text-muted)' }
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {!user ? (
            <>
              <Link to="/signin" className="btn-secondary text-sm">
                Entrar
              </Link>
              <Link to="/signup" className="btn-primary hidden text-sm sm:inline-flex">
                Criar conta
              </Link>
            </>
          ) : (
            <>
              <p className="hidden text-sm md:block" style={{ color: 'var(--text-muted)' }}>
                Olá, <span className="font-semibold" style={{ color: 'var(--text)' }}>{user.name}</span>
              </p>
              <button type="button" onClick={logout} className="btn-secondary text-sm">
                Sair
              </button>
              <Link to="/chat" className="btn-primary text-sm">
                Abrir copiloto
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
