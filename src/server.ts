import { https } from 'firebase-functions';
import next from 'next';

const isDev: boolean = process.env.NODE_ENV !== 'production';
const server = next({
  dev: isDev,
  conf: { distDir: '.next' },
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req as any, res));
});
