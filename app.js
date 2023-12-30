const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to check if it's working hours
const workingHoursMiddleware = (req, res, next) => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentHour = currentDate.getHours();

    // Check if it's a weekday and between 9 AM and 5 PM
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentHour >= 9 && currentHour < 17) {
        next(); // Continue with the next middleware or route handler
    } else {
        res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
};

// Middleware for serving static files (CSS)
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', workingHoursMiddleware, (req, res) => {
    res.render('home');
});

app.get('/services', workingHoursMiddleware, (req, res) => {
    res.render('services');
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
    res.render('contact');
});

// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
