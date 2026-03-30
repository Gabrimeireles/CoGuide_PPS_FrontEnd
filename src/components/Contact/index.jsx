
export function Contact() {
  return (
    <section className="mx-auto w-full max-w-2xl">
      <div className="panel p-8 md:p-10">
        <h1 className="section-title">Fale com o time CoGuide</h1>
        <p className="section-subtitle mt-3">
          Compartilhe seu cenário de suporte eSocial para desenharmos juntos a melhor estratégia de implantação do copiloto.
        </p>

        <form className="mt-8 grid gap-4" onSubmit={(event) => event.preventDefault()}>
          <label className="grid gap-2 text-sm font-semibold">
            Nome completo
            <input type="text" className="field" placeholder="Seu nome" />
          </label>

          <label className="grid gap-2 text-sm font-semibold">
            E-mail corporativo
            <input type="email" className="field" placeholder="nome@empresa.com" />
          </label>

          <label className="grid gap-2 text-sm font-semibold">
            Mensagem
            <textarea rows={5} className="field" placeholder="Ex.: time de 25 agentes, alto volume de dúvidas em S-1200 e fechamento mensal" />
          </label>

          <button type="submit" className="btn-primary mt-2 w-full sm:w-fit">
            Enviar mensagem
          </button>
        </form>
      </div>
    </section>
  );
}
