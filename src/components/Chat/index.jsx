/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useAuth } from '/src/contexts/authContext';
import { sendChatPrompt } from '/src/lib/api';

function mapMessageAuthor(role) {
  if (role === 'user') {
    return 'Você';
  }

  if (role === 'assistant') {
    return 'CoGuide';
  }

  return 'Sistema';
}

export function Chat({ activeChat, onChatUpdated }) {
  const { token } = useAuth();
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const visibleMessages = useMemo(() => {
    if (!activeChat?.messages) {
      return [];
    }

    return activeChat.messages.filter((message) => message.role !== 'system');
  }, [activeChat]);

  const handleSendMessage = async () => {
    const content = messageText.trim();

    if (!content || !token || isSending) {
      return;
    }

    setIsSending(true);
    setErrorMessage('');

    try {
      const chatId = activeChat?.id || activeChat?._id || null;
      const updatedChat = await sendChatPrompt(token, content, chatId);
      onChatUpdated(updatedChat);
      setMessageText('');
    } catch (error) {
      setErrorMessage(error.message || 'Não foi possível enviar a mensagem.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="panel flex h-[calc(100vh-2rem)] flex-col p-5">
      <header className="mb-4 border-b pb-4" style={{ borderColor: 'var(--line)' }}>
        <h1 className="text-xl font-bold">Copiloto de Suporte eSocial</h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Conversas orientadas por contexto para reduzir tempo de resolução e aumentar consistência técnica.
        </p>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {visibleMessages.length > 0 ? (
          visibleMessages.map((message, index) => {
            const author = mapMessageAuthor(message.role);
            const isUser = message.role === 'user';

            return (
              <article
                key={`${message.role}-${index}`}
                className={`max-w-[85%] rounded-2xl border p-4 text-sm leading-7 ${isUser ? 'ml-auto' : ''}`}
                style={{
                  borderColor: 'var(--line)',
                  backgroundColor: isUser
                    ? 'color-mix(in srgb, var(--primary) 14%, var(--surface))'
                    : 'var(--surface)',
                }}
              >
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--text-muted)' }}>
                  {author}
                </p>
                <p>{message.content}</p>
              </article>
            );
          })
        ) : (
          <article className="max-w-[85%] rounded-2xl border p-4 text-sm leading-7" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }}>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--text-muted)' }}>
              CoGuide
            </p>
            <p>Comece enviando uma dúvida sobre eSocial para iniciar um novo atendimento.</p>
          </article>
        )}
      </div>

      {errorMessage && (
        <p className="mb-3 rounded-xl border px-3 py-2 text-xs" style={{ borderColor: 'var(--line)', color: '#dc2626', backgroundColor: 'color-mix(in srgb, #dc2626 8%, var(--surface))' }}>
          {errorMessage}
        </p>
      )}

      <div className="mt-4 flex items-end gap-3">
        <textarea
          rows={2}
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          placeholder="Digite a dúvida do atendimento"
          className="field min-h-[60px] resize-none"
        />
        <button
          type="button"
          onClick={handleSendMessage}
          disabled={isSending}
          className="btn-primary h-[46px] w-[46px] rounded-xl p-0 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Enviar mensagem"
        >
          <PaperAirplaneIcon className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
