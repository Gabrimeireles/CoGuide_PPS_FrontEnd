import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Copiloto especializado em eSocial',
    description: 'Respostas assistidas para cenários como rejeição de eventos, inconsistência de rubricas e dúvidas de fechamento da folha.',
  },
  {
    title: 'RAG com base documental rastreável',
    description: 'O contexto é recuperado por pipeline RAG e pode evoluir para citações estruturadas por trecho e fonte na experiência de atendimento.',
  },
  {
    title: 'Handoff técnico com resumo acionável',
    description: 'Cada conversa gera síntese objetiva com próximos passos, facilitando escalonamento para níveis mais técnicos quando necessário.',
  },
  {
    title: 'Observabilidade de IA na operação',
    description: 'Telemetria de retrieval e completion para acompanhar latência, qualidade de resposta e evolução contínua do serviço.',
  },
];

const benefits = [
  'Mais velocidade na resolução de chamados eSocial',
  'Maior padronização de respostas entre analistas',
  'Menos retrabalho por orientação técnica inconsistente',
  'Base pronta para escala com governança e segurança',
];

export function CoGuide() {
  return (
    <section className="space-y-6">
      <div className="panel p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--text-muted)' }}>
          Plataforma
        </p>
        <h1 className="section-title mt-2">CoGuide para suporte técnico em eSocial</h1>
        <p className="section-subtitle mt-4 max-w-3xl">
          Da triagem ao fechamento do chamado, a CoGuide apoia seu time com inteligência contextual, fluxo guiado e visão operacional para elevar qualidade e previsibilidade no atendimento.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {features.map((item) => (
          <article key={item.title} className="panel p-6">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-muted)' }}>
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="panel p-8 md:p-10">
        <h2 className="text-2xl font-bold">Benefícios para o negócio</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {benefits.map((item) => (
            <li key={item} className="rounded-xl border p-4 text-sm font-medium" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }}>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/chat" className="btn-primary">
            Experimentar copiloto
          </Link>
          <Link to="/contact" className="btn-secondary">
            Falar com especialista
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CoGuide;
