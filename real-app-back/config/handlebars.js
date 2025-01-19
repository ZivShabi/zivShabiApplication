const { engine } = require('express-handlebars')
const path = require('path')

const configureHandlebars = (app) => {
    app.engine('handlebars', engine({
        layoutsDir: path.join(__dirname, '../views', 'layouts'),
        defaultLayout: 'main',
        partialsDir: path.join(__dirname, '../views', 'partials'),
    }));
    app.set('view engine', 'handlebars')
    app.set('views', path.join(__dirname, '../views'))


};

module.exports = { configureHandlebars }
