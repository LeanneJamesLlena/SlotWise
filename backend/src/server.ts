import 'dotenv/config';
import { env } from '@/config/env.js';
import app from '@/app.js';
import { connectDB, disconnectDB } from '@/config/db.js';


let server: ReturnType<typeof app.listen> | undefined;
let shutDownTimer: NodeJS.Timeout | undefined;
let isShuttingDown = false;
const SHUTDOWN_TIMEOUT = 10000;


const gracefulShutdown = async (signal: string, error?: unknown): Promise<void> => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  shutDownTimer = setTimeout(() => {
    console.error('Force shutdown: graceful shutdown timeout exceeded');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT);

  shutDownTimer.unref();

  if (error) {
    console.error(`${signal} - Error:`, error);
  } else {
    console.log(`${signal} - Shutting down gracefully`);
  }
  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server!.close((error) => {
          if (error) {
            console.error('Error closing HTTP server:', error);
            reject(error);
          } else {
            console.log('HTTP server closed');
            resolve();
          }
        })
      })
    };

    await disconnectDB();

    console.log('Graceful shutdown completed');

    if (shutDownTimer) clearTimeout(shutDownTimer);
    process.exit(error ? 1 : 0);
  } catch (shutdownError) {
    console.error('Error during shutdown:', shutdownError);
    if (shutDownTimer) clearTimeout(shutDownTimer);
    process.exit(1);
  }

}

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    server = app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode `);
      console.log(`HOST: http://localhost:${env.PORT}`);
    });
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${env.PORT} is already in use`);
      } else {
        console.error(`Server error:`, error);
      }
      console.error('Exiting..');
      gracefulShutdown('serverError', error);
    });

  } catch (error) {
    console.error('Failed to start server', error);
    await gracefulShutdown('startServer', error);
  };
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  gracefulShutdown('unhandledRejection', reason);
});
process.on('uncaughtException', (error) => {
  gracefulShutdown('uncaughtException', error);
});




startServer();