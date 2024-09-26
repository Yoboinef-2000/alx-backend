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

// Function to create the hash
function createHash() {
  theRedisClient.hset('HolbertonSchools', 'Portland', 50, redis.print);
  theRedisClient.hset('HolbertonSchools', 'Seattle', 80, redis.print);
  theRedisClient.hset('HolbertonSchools', 'New York', 20, redis.print);
  theRedisClient.hset('HolbertonSchools', 'Bogota', 20, redis.print);
  theRedisClient.hset('HolbertonSchools', 'Cali', 40, redis.print);
  theRedisClient.hset('HolbertonSchools', 'Paris', 2, redis.print);
}

// Function to display the hash
function displayHash() {
    theRedisClient.hgetall('HolbertonSchools', (err, res) => {
    if (err) {
      console.error(`Error: ${err.message}`);
    } else {
      console.log(res);
    }
  });
}

createHash();
displayHash();
