import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import brand from '/src/assets/brand.png';
import { ThemeToggle } from '/src/components/ThemeToggle';
import { useAuth } from '/src/contexts/authContext';

export function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      Swal.fire({
        icon: 'success',
        title: 'Login realizado com sucesso!',
        showConfirmButton: false,
        timer: 1400,
      });
      navigate('/chat');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Falha ao fazer login',
        text: error.message || 'Verifique seu e-mail e senha e tente novamente.',
      });
    }
  };

  return (
    <div className="panel w-full max-w-md p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={brand} alt="CoGuide" className="h-12 w-12 rounded-xl border p-1" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>
              CoGuide
            </p>
            <p className="text-xl font-bold">Entrar</p>
          </div>
        </Link>
        <ThemeToggle />
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold">
          E-mail
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field" placeholder="nome@empresa.com" required />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Senha
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="field" placeholder="Sua senha" required />
        </label>

        <button type="submit" className="btn-primary mt-2 w-full">
          Entrar na plataforma
        </button>
      </form>

      <p className="mt-5 text-sm" style={{ color: 'var(--text-muted)' }}>
        Ainda não tem conta?{' '}
        <Link to="/signup" className="font-semibold" style={{ color: 'var(--primary)' }}>
          Criar conta
        </Link>
      </p>
    </div>
  );
}
