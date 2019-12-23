#!/usr/bin/env node
'use strict';

const fs = require('fs');
const { version } = require('../package.json');
const readme = './README.md';

fs.readFile(readme, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    const result = data.replace(/v[.\d]{5}/, `v${version}`);

    fs.writeFile(readme, result, 'utf8', writeErr => {
      if (writeErr) {
        console.log(err);
        return;
      }
    });
  }
});
