const express = require('express');
const app = express();
const PORT = 5050;

app.use(express.json());

app.use(require('./routes/routes'));

app.listen(PORT, () => console.log(`Server open on port ${PORT}!`));
