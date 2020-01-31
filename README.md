## Available Scripts

In the project directory, you can run:

### `npm test`

Launches the test runner.

there is no way to fake and speed up the timers using await async in jest (yet) so tests are slow and I probably wouldn't want to do anything like this in production

## How to use

**Helper function tech test**

nb. this isn't a full module nor is it registered anywhere, I've just set this up so I can easily use a test runner.

The helper function is async because of the wait times required in specific circumstances which means it is a promise or could use async await syntax

the main helper function and tests can be found in ./utils/GetProcessingPage
