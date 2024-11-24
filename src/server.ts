import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    // connecting to mongoDB using mongoose and secured the mongodb url using .env
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
