# Deployment

Production runs at **https://omara.hotelpalacio.in**, on the Hotel Palacio
CloudPanel VPS behind Cloudflare.

| | |
| --- | --- |
| Site user | `palacio-omara` |
| App directory | `/home/palacio-omara/htdocs/omara.hotelpalacio.in` |
| PM2 process | `palacio-omara`, `next start` on `127.0.0.1:3006` |
| Proxy | CloudPanel nginx, Let's Encrypt certificate (auto-renewed) |

Pushes to `main` run [.github/workflows/deploy.yml](.github/workflows/deploy.yml):
build on the runner, rsync `.next/` and `public/` to the server, `npm ci
--omit=dev` there when the lockfile changed, then `pm2 reload`. It can also be
run by hand from the Actions tab ("Run workflow").

## Secrets (repo owner only)

Add under **Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `SSH_HOST` | the VPS IP address |
| `SSH_KEY` | the private deploy key for `palacio-omara`, header and footer included |

Until both are set, runs build but skip the deploy, and finish green with a
warning. The deploy key is already authorized on the server; ask Gaurav for it.

## Notes

- [ecosystem.config.js](ecosystem.config.js) runs Next's binary directly with a
  400 MB `max_memory_restart`. The server is shared with other sites.
- PM2 is started at boot by `pm2-palacio-omara.service`.
- Rollback: Actions → the run for the commit you want → "Re-run all jobs".
