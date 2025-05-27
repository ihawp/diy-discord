const cron = require('node-cron');

/**
 * @source https://www.npmjs.com/package/node-cron
 * @example

    const cron = require('node-cron');

    cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
    });

    ----------------------------------------------

    Cheat Sheet:
    -----------

    Allowed fields
    # ┌────────────── second (optional)
    # │ ┌──────────── minute
    # │ │ ┌────────── hour
    # │ │ │ ┌──────── day of month
    # │ │ │ │ ┌────── month
    # │ │ │ │ │ ┌──── day of week
    # │ │ │ │ │ │
    # │ │ │ │ │ │
    # * * * * * *
    Allowed values:
    --------------------
    @field	      |  @value  |  @or (other representations)
    --------------------------------------------------
    second	      |  0-59   |
    minute	      |  0-59   |
    hour	      |  0-23   |
    day of month  |  1-31   |
    month	      |  1-12   |  names
    day of week	  |  0-7    |  names, 0 or 7 are sunday
 */

const doSomething = () => 10;

// Do something
cron.schedule('* * 1 * *', doSomething);