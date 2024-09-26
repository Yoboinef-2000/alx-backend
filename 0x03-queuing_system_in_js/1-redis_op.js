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

function setNewSchool(schoolName, value) {
    theRedisClient.set(schoolName, value, redis.print);
}

function displaySchoolValue(schoolName) {
    theRedisClient.get(schoolName, (err, value) => {
      if (err) {
        console.error(`Error: ${err}`);
      } else {
        console.log(value);
      }
    });
}
  
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
