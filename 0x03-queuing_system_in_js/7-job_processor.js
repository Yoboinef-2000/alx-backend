import kue from 'kue';

// Array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notifications
function sendNotification(phoneNumber, message, job, done) {
  // Track the initial progress of the job
  job.progress(0, 100);

  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Track the progress of the job to 50%
  job.progress(50, 100);

  // Simulate sending notification
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Track the final progress and complete the job
  done();
}

// Create a Kue queue instance
const queue = kue.createQueue();

// Process jobs from 'push_notification_code_2' queue, limit to 2 jobs at a time
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
