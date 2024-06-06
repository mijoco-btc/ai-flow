import cron from 'node-cron';

export const testJob = cron.schedule('*/17 * * * *', (fireDate) => {
  console.log('Running: scheduled tasks at: ' + fireDate);
  try {
    
  } catch (err) {
    console.log('Error running: scheduled tasks: ', err);
  }
});
