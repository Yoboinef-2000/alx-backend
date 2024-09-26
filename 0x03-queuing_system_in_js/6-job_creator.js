import kue from 'kue';

// Create a queue instance
const queue = kue.createQueue();

// Job data object
const jobData = {
  phoneNumber: '1234567890',
  message: 'This is a notification message!',
};

// Create a job in the 'push_notification_code' queue
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    } else {
      console.error('Error creating job:', err);
    }
  });

// Job event listeners
job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', () => {
  console.log('Notification job failed');
});
