import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const initialMessages = [
  {
    author: 'CoGuide',
    message: 'Olá! Posso ajudar com dúvidas de eSocial, erros de eventos e orientação de resposta ao cliente.',
  },
  {
    author: 'Você',
    message: 'Recebi erro no envio do S-1200 após fechamento. Qual roteiro de atendimento devo seguir?',
  },
  {
    author: 'CoGuide',
    message: 'Sugestão inicial: validar competência, checar pré-requisitos do S-1299, confirmar vínculo e revisar retorno do processamento para orientar correção com prazo.',
  },
];

export function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    const content = messageText.trim();

    if (!content) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        author: 'Você',
        message: content,
      },
    ]);

    setMessageText('');
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
        {messages.map((message, index) => (
          <article
            key={`${message.author}-${index}`}
            className={`max-w-[85%] rounded-2xl border p-4 text-sm leading-7 ${message.author === 'Você' ? 'ml-auto' : ''}`}
            style={{
              borderColor: 'var(--line)',
              backgroundColor: message.author === 'Você' ? 'color-mix(in srgb, var(--primary) 14%, var(--surface))' : 'var(--surface)',
            }}
          >
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--text-muted)' }}>
              {message.author}
            </p>
            <p>{message.message}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-end gap-3">
        <textarea
          rows={2}
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          placeholder="Digite a dúvida do atendimento"
          className="field min-h-[60px] resize-none"
        />
        <button type="button" onClick={handleSendMessage} className="btn-primary h-[46px] w-[46px] rounded-xl p-0" aria-label="Enviar mensagem">
          <PaperAirplaneIcon className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
