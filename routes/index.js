var app           = require('../app');

var userRouter    = require('./src/users/userRoutes');
var profileRouter = require('./src/profile/profileRoutes');
var campusRouter  = require('./src/campus/campusRoutes');

app.use('/users', userRouter);
app.use('/campus', campusRouter);
app.use('/profile', profileRouter);