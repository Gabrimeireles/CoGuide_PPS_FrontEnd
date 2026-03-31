import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import brand from '/src/assets/brand.png';
import { ThemeToggle } from '/src/components/ThemeToggle';

export function Sidebar() {
  const [historic, setHistoric] = useState([]);

  useEffect(() => {
    const getHistoric = async () => {
      try {
        const response = await fetch('/api/chats');
        const historicData = await response.json();

        if (response.ok && Array.isArray(historicData)) {
          setHistoric(historicData);
        }
      } catch (_error) {
        setHistoric([]);
      }
    };

    getHistoric();
  }, []);

  return (
    <aside className="panel flex h-[calc(100vh-2rem)] flex-col p-5">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={brand} alt="CoGuide" className="h-10 w-10 rounded-xl border p-1" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }} />
          <div>
            <p className="text-sm font-bold">CoGuide</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Suporte técnico eSocial</p>
          </div>
        </Link>
        <ThemeToggle />
      </div>

      <button type="button" className="btn-primary mb-5 w-full justify-center">
        <PlusCircleIcon className="h-5 w-5" />
        Novo atendimento
      </button>

      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em]" style={{ color: 'var(--text-muted)' }}>
        <ClockIcon className="h-4 w-4" />
        Conversas recentes
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {historic.length > 0 ? (
          historic.map((chat) => (
            <button
              key={chat.id}
              type="button"
              className="w-full rounded-xl border p-3 text-left text-sm font-medium transition hover:opacity-90"
              style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }}
            >
              {chat.name}
            </button>
          ))
        ) : (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Nenhum histórico encontrado.
          </p>
        )}
      </div>
    </aside>
  );
}
