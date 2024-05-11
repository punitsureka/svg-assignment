// Libs
import express from 'express';

// Modules
import cors from 'cors';
import router from './routes/game.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/games', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
