// Dependencies
const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const passport = require('./config/passport')
const helmet = require('helmet')
const sassMiddleware = require('node-sass-middleware')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({ defaultLayout: 'main' })
const db = require('./models')

// Routes
const routes = require('./routes/index.js')
const users = require('./routes/users.js')
const dashboard = require('./routes/dashboard.js')

// Mount middleware
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: false
}))

// Routers
app.use('/', routes)
app.use('/api/users', users)
app.use('/api/dashboard', dashboard)

// Catch 404, forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler (no stack trace outside dev env)
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message,
      error: (app.get('env') === 'development') ? err : {}
    })
})

// Define port
const PORT = process.env.PORT || 8080

// Initialize database
db.sequelize.sync({ force: true })
  // Start server
  .then(() => app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`)))
