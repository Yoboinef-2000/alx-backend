import redis from 'redis';

const theRedisClient = redis.createClient();

// Event listener for successful connection
theRedisClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event listener for errors
theRedisClient.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the channel
theRedisClient.subscribe('holberton school channel');

// Handle receiving messages
theRedisClient.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    theRedisClient.unsubscribe();
    theRedisClient.quit();
  }
});
