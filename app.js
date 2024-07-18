const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

// Configure handlebars engine
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');

app.set('view engine', 'ejs');
app.set('views','views')
// app.set('views', path.join(__dirname, 'views'));

// Middleware to parse URL-encoded bodies (for forms)
app.use(express.urlencoded({ extended: false }));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Mount admin routes
app.use('/admin', adminRoutes.routes);

// Mount shop routes
app.use('/', shopRoutes);

// 404 handler
app.use((req, res, next) => {
    res.status(404).render('page-not-found', { pageTitle: 'Page Not Found' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
