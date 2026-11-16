// PM2 process for omara.hotelpalacio.in on the CloudPanel VPS.
//
// Runs Next's own binary rather than `npm start`, so PM2 watches the server
// process itself: max_memory_restart then applies to the thing that actually
// grows, and there is no idle npm wrapper holding ~45 MB. The server is shared
// with other sites, so the cap matters.
//
// Bound to 127.0.0.1: only CloudPanel's nginx should reach it, never the
// public internet directly on :3006.
module.exports = {
  apps: [
    {
      name: 'palacio-omara',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --hostname 127.0.0.1 --port 3006',
      cwd: __dirname,
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production',
        PORT: 3006,
        NEXT_TELEMETRY_DISABLED: '1',
      },
    },
  ],
}
