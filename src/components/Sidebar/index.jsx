/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowPathIcon, ClockIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import brand from '/src/assets/brand.png';
import { ThemeToggle } from '/src/components/ThemeToggle';

function getChatId(chat) {
  return chat?.id || chat?._id || null;
}

export function Sidebar({
  chats,
  activeChatId,
  isLoading,
  errorMessage,
  onSelectChat,
  onCreateChat,
  onRefreshChats,
}) {
  useEffect(() => {
    onRefreshChats();
  }, [onRefreshChats]);

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

      <div className="mb-3 flex gap-2">
        <button type="button" className="btn-primary w-full justify-center" onClick={onCreateChat}>
          <PlusCircleIcon className="h-5 w-5" />
          Novo atendimento
        </button>
        <button type="button" className="btn-secondary px-3" onClick={onRefreshChats} aria-label="Atualizar histórico" title="Atualizar histórico">
          <ArrowPathIcon className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em]" style={{ color: 'var(--text-muted)' }}>
        <ClockIcon className="h-4 w-4" />
        Conversas recentes
      </div>

      {errorMessage && (
        <p className="mb-3 rounded-xl border px-3 py-2 text-xs" style={{ borderColor: 'var(--line)', color: '#dc2626', backgroundColor: 'color-mix(in srgb, #dc2626 8%, var(--surface))' }}>
          {errorMessage}
        </p>
      )}

      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {chats.length > 0 ? (
          chats.map((chat) => {
            const chatId = getChatId(chat);
            const isActive = activeChatId && chatId === activeChatId;

            return (
              <button
                key={chatId}
                type="button"
                onClick={() => onSelectChat(chatId)}
                className="w-full rounded-xl border p-3 text-left text-sm font-medium transition hover:opacity-90"
                style={{
                  borderColor: isActive ? 'var(--primary)' : 'var(--line)',
                  backgroundColor: isActive
                    ? 'color-mix(in srgb, var(--primary) 14%, var(--surface))'
                    : 'var(--surface)',
                }}
              >
                {chat.title || 'Atendimento sem título'}
              </button>
            );
          })
        ) : (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {isLoading ? 'Carregando histórico...' : 'Nenhum histórico encontrado.'}
          </p>
        )}
      </div>
    </aside>
  );
}
