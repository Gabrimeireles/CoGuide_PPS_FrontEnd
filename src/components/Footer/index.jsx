

export function Footer() {
  return (
    <footer className="border-t py-6" style={{ borderColor: 'var(--line)' }}>
      <div className="mx-auto flex w-[min(1200px,calc(100%-2.5rem))] flex-col items-start justify-between gap-4 text-sm sm:flex-row sm:items-center">
        <p style={{ color: 'var(--text-muted)' }}>
          © 2026 CoGuide. Plataforma AI para suporte e customer success.
        </p>
        <a href="mailto:CoGuide_atendimento@gmail.com" className="font-semibold hover:underline">
          CoGuide_atendimento@gmail.com
        </a>
      </div>
    </footer>
  );
}
