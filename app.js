const express = require('express');
const path = require('path');

const notFoundController = require('./controllers/not-found');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views','views')

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

// 404 handler
app.use(notFoundController.getNotFound);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
