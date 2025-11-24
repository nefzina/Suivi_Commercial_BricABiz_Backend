import app from './src/common/app.js';
import { config } from './src/config/config.js';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});