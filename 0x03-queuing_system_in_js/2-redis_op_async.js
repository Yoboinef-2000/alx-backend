import redis from 'redis';
import { promisify } from 'util';

const theRedisClient = redis.createClient();

// Event listener for successful connection
theRedisClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event listener for errors
theRedisClient.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

const getAsync = promisify(theRedisClient.get).bind(theRedisClient);

function setNewSchool(schoolName, value) {
    theRedisClient.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
    try {
        const value = await getAsync(schoolName);
        console.log(value);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
}
  
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
