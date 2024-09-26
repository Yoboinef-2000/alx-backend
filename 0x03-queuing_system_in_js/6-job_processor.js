import kue from 'kue';

// Create a queue instance
const queue = kue.createQueue();

// Function to send notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Queue process listening to 'push_notification_code' jobs
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  
  // Call the sendNotification function with the phoneNumber and message
  sendNotification(phoneNumber, message);
  
  done(); // Signal job completion
});
