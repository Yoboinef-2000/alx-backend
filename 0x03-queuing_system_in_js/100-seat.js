import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

// Initialize Redis client
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Initialize Kue queue
const queue = kue.createQueue();

// Initialize Express app
const app = express();
const port = 1245;

// Initialize reservation variables
let reservationEnabled = true;
const initialAvailableSeats = 50;

// Function to reserve seats
const reserveSeat = async (number) => {
  await setAsync('available_seats', number);
};

// Function to get the current available seats
const getCurrentAvailableSeats = async () => {
  const seats = await getAsync('available_seats');
  return seats ? parseInt(seats) : 0;
};

// Set initial available seats
reserveSeat(initialAvailableSeats);

// Route to get the number of available seats
app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats.toString() });
});

// Route to reserve a seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservations are blocked' });
  }

  const job = queue.create('reserve_seat', {}).save((err) => {
    if (!err) {
      return res.json({ status: 'Reservation in process' });
    }
    return res.json({ status: 'Reservation failed' });
  });
});

// Process the queue
queue.process('reserve_seat', async (job, done) => {
  try {
    const availableSeats = await getCurrentAvailableSeats();
    if (availableSeats <= 0) {
      reservationEnabled = false;
      return done(new Error('Not enough seats available'));
    }

    // Decrease the number of available seats
    await reserveSeat(availableSeats - 1);
    console.log(`Seat reservation job ${job.id} completed`);
    done();
  } catch (error) {
    console.error(`Seat reservation job ${job.id} failed: ${error.message}`);
    done(error);
  }
});

// Route to process the queue
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });
  queue.process();
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
