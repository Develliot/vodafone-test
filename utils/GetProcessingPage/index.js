/**
 
  Vodafone coding challenge
 
  You have been tasked with creating a helper function that will be used to determine the output
  of an array of data.

  Each element of the array has the following structure:

    {
      state: <String> - a state to go to
      errorCode: <String> - optional error code
    }

  The states have different functionalities:

    'processing' = delay by 2 seconds, then fetch the next state
    'error' = handle the error code provided (see below)
    'success' = return from the helper with the object: { title: 'Order complete' message: null }

  Handling error codes:

    'NO_STOCK' = return from the helper with an object: { title: 'Error page', message: 'No stock has been found' }
    'INCORRECT_DETAILS' = return from the helper with an object: { title: 'Error page', message: 'Incorrect details have been entered' }
    null = return from the helper with an object: { title: 'Error page', message: null }
    undefined = return from the helper with an object: { title: 'Error page', message: null }

  Example usage:
  -------
  getProcessingPage([{ state: 'processing' }, { state: 'error' }])
  => should return after 2 seconds with the object: { title: 'Error page', message: null }

  Notes:
  - Provide the code and a description of how to run it
**/

// This assumes that we put an array in and want an object out so we could use a reducer

const messagePromiseFromStateObject = stateObject => {
    return new Promise((resolve, reject) => {
        const status = stateObject.status;
        if (!status) {
            reject(new Error('status missing'));
        }
        if (status === 'error') {
            const errorCode = stateObject.errorCode || null;
            switch (errorCode) {
                case 'NO_STOCK':
                    resolve({
                        title: 'Error page',
                        message: 'No stock has been found',
                    });
                case 'INCORRECT_DETAILS':
                    resolve({
                        title: 'Error page',
                        message: 'Incorrect details have been entered',
                    });
                default:
                    resolve({ title: 'Error page', message: null });
            }
        } else if (status === 'success') {
            resolve({ title: 'Order complete', message: null });
        } else if (status === 'processing') {
            // We could go really specific by checking date object with smaller intervals
            setTimeout(function() {
                resolve();
            }, 2000);
        }
    });
};

/**
 * Gets the processing page
 * @param {array} data
 */

function getProcessingPage(data) {
    // return await data.reduce(reducer, null);
    const message = data
        .reduce(async (previousPromise, stateObject) => {
            await previousPromise;
            return messagePromiseFromStateObject(stateObject);
        }, Promise.resolve())
        .then(value => value);

    return message;
}

exports.getProcessingPage = getProcessingPage;
