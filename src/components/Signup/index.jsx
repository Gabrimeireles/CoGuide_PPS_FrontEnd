import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import brand from '/src/assets/brand.png';
import { ThemeToggle } from '/src/components/ThemeToggle';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'As senhas não conferem',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Não foi possível criar a conta.');
      }

      Swal.fire({
        icon: 'success',
        title: 'Conta criada com sucesso!',
        showConfirmButton: false,
        timer: 1400,
      });
      navigate('/signin');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar',
        text: error.message,
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
            <p className="text-xl font-bold">Criar conta</p>
          </div>
        </Link>
        <ThemeToggle />
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold">
          Nome
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} className="field" placeholder="Seu nome" required />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          E-mail
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field" placeholder="nome@empresa.com" required />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Senha
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="field" placeholder="Crie uma senha" required />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Confirmar senha
          <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="field" placeholder="Repita a senha" required />
        </label>

        <button type="submit" className="btn-primary mt-2 w-full">
          Criar conta
        </button>
      </form>

      <p className="mt-5 text-sm" style={{ color: 'var(--text-muted)' }}>
        Já possui conta?{' '}
        <Link to="/signin" className="font-semibold" style={{ color: 'var(--primary)' }}>
          Entrar
        </Link>
      </p>
    </div>
  );
}
