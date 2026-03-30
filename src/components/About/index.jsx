import { Link } from 'react-router-dom';

const principles = [
  {
    title: 'Domínio real de suporte eSocial',
    description: 'A plataforma foi desenhada para o dia a dia de agentes que tratam inconsistências, dúvidas de envio e validações de eventos.',
  },
  {
    title: 'Precisão com governança',
    description: 'Respostas orientadas por contexto e regras operacionais reduzem risco de orientação incorreta e aumentam confiança do time.',
  },
  {
    title: 'Evolução orientada por dados',
    description: 'Com telemetria e análise de padrões, a operação identifica gargalos e ajusta processo, base de conhecimento e fluxo de atendimento.',
  },
];

export function About() {
  return (
    <section className="space-y-6">
      <div className="panel space-y-5 p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--text-muted)' }}>
          Sobre a CoGuide
        </p>
        <h1 className="section-title">Copiloto técnico para operações de atendimento eSocial</h1>
        <p className="section-subtitle max-w-3xl">
          A CoGuide nasceu para apoiar times de suporte que precisam responder com rapidez e precisão em temas críticos de eSocial. Unimos IA conversacional, recuperação contextual e observabilidade para entregar um atendimento mais confiável e escalável.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {principles.map((item) => (
          <article key={item.title} className="panel p-6">
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-muted)' }}>
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="panel flex flex-col items-start justify-between gap-4 p-8 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Quer evoluir seu suporte técnico em eSocial?</h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            Explore a plataforma e teste o copiloto em um fluxo de atendimento real.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/coguide" className="btn-secondary">
            Ver plataforma
          </Link>
          <Link to="/chat" className="btn-primary">
            Iniciar teste
          </Link>
        </div>
      </div>
    </section>
  );
}
