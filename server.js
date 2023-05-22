const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(routes);

app.use(express.urlendcoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


db.onc('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
