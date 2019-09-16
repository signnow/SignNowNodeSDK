'use strict';

const promisify = clientMethod => payload => new Promise((resolve, reject) => {
  clientMethod(payload, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

module.exports = { promisify };
