# CoGuide Frontend

Frontend React (Vite) do CoGuide, plataforma de copiloto para suporte técnico eSocial.

## Integração com Backend

A aplicação consome a API NestJS do backend CoGuide.

- Produção (default): `https://api-coguide.grmeireles.dev`
- Local (homeserver via túnel/localhost): configure em `.env.local`

### Variáveis de ambiente

Use `.env.example` como base:

```bash
VITE_API_BASE_URL=http://localhost:3002
```

Exemplo local:

1. Copiar `.env.example` para `.env.local`
2. Ajustar `VITE_API_BASE_URL` para o endpoint desejado

## Scripts

```bash
npm ci
npm run dev
npm run lint
npm run build
```

## Docker

O projeto possui `Dockerfile` para build estático com Nginx e endpoint de healthcheck em `/healthz`.

Build local:

```bash
docker build -t coguide-frontend:local .
```

Run local:

```bash
docker run --rm -p 4000:80 coguide-frontend:local
```

## Deploy com reusable-workflows

Workflows adicionados:

- `.github/workflows/frontend-build.yml`
- `.github/workflows/frontend-deploy.yml`

### Variáveis de repositório necessárias

- `DEPLOY_PATH_FRONTEND` (ex.: `/srv/stacks/coguide-frontend`)
- `FRONTEND_HEALTH_URL` (ex.: `https://front-coguide.seu-dominio/healthz`)

### Secrets necessários

- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_SSH_KEY`
- `GHCR_TOKEN` ou `GHCR_PAT`
- `RUNTIME_ENV_FILE` (conteúdo para `.env.frontend` no servidor)
- `TS_OAUTH_CLIENT_ID` e `TS_OAUTH_SECRET` (se usar tailscale)

## Observação de CORS no backend

No backend, `CORS_ORIGIN` deve incluir a URL real do frontend (não apenas localhost) para login/chat funcionarem em produção.
