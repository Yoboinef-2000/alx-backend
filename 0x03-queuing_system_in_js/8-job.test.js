import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', function () {
  let queue;

  // Before each test, set the queue in test mode
  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode.enter(); // Enable test mode
  });

  // After each test, clear the queue and exit test mode
  afterEach(() => {
    queue.testMode.clear(); // Clear jobs in the queue
    queue.testMode.exit();  // Exit test mode
  });

  it('should display an error message if jobs is not an array', function () {
    expect(() => createPushNotificationsJobs('invalid data', queue)).to.throw(Error, 'Jobs is not an array');
  });

  it('should create two new jobs to the queue', function () {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4567 to verify your account',
      },
    ];

    // Call the function with a valid array of jobs
    createPushNotificationsJobs(jobs, queue);

    // Check if 2 jobs have been created in the queue
    expect(queue.testMode.jobs.length).to.equal(2);

    // Validate the data for the first job
    expect(queue.testMode.jobs[0].data).to.deep.equal({
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account',
    });

    // Validate the data for the second job
    expect(queue.testMode.jobs[1].data).to.deep.equal({
      phoneNumber: '4153518781',
      message: 'This is the code 4567 to verify your account',
    });
  });
});
