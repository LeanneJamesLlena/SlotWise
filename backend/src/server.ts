import 'dotenv/config';
import { env } from '@/config/env.js';
import app from '@/app.js';
import { connectDB } from '@/config/db.js';

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
