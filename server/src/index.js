const app = require('./app');

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SnackSafari server running on port ${PORT}`);
  });
}

module.exports = app;
