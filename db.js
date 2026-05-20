// Simulated database connector
// connect() returns a Promise that resolves after 1000ms

function connect() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // simulate successful connection
      resolve('connected');
    }, 1000);
  });
}

module.exports = { connect };
