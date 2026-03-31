import { Link } from 'react-router-dom';
import { BoltIcon, ChatBubbleLeftRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

const highlights = [
  {
    title: 'Respostas para dúvidas de eSocial com contexto',
    description: 'O copiloto interpreta o histórico do ticket e sugere resposta técnica alinhada ao cenário do cliente e ao evento reportado.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: 'Fluxos guiados para operação de suporte',
    description: 'Playbooks para inconsistências de envio, divergências cadastrais e erros de retorno ajudam o time a agir com padrão e velocidade.',
    icon: BoltIcon,
  },
  {
    title: 'Qualidade contínua baseada em evidências',
    description: 'Métricas de resolução e recomendações operacionais apontam gargalos e oportunidades de melhoria no atendimento.',
    icon: SparklesIcon,
  },
];

export function Home() {
  return (
    <section className="space-y-8">
      <div className="panel relative overflow-hidden p-8 md:p-12">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-28 left-20 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border px-4 py-1 text-sm font-semibold" style={{ borderColor: 'var(--line)', color: 'var(--text-muted)', backgroundColor: 'var(--surface)' }}>
              Plataforma SaaS para suporte técnico em eSocial
            </p>

            <h1 className="section-title text-4xl md:text-6xl">
              CoGuide: copiloto de atendimento para operações eSocial.
            </h1>

            <p className="section-subtitle max-w-2xl">
              A CoGuide acelera triagem, diagnóstico e resposta de chamados relacionados ao eSocial, reduzindo retrabalho e elevando consistência entre agentes.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/chat" className="btn-primary">
                Abrir copiloto
              </Link>
              <Link to="/coguide" className="btn-secondary">
                Ver capacidades
              </Link>
            </div>
          </div>

          <div className="panel space-y-5 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>
              Impacto na operação
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-3xl font-extrabold">-38%</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Tempo médio de atendimento</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">+26%</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Resolução no primeiro contato</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">99.9%</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Disponibilidade da plataforma</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">24/7</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Assistência para agentes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className="panel p-6">
              <div className="mb-4 inline-flex rounded-xl border p-2" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }}>
                <Icon className="h-5 w-5" style={{ color: 'var(--primary)' }} />
              </div>
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-muted)' }}>
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
