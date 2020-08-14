#!/usr/bin/env node
/* eslint-disable no-console */

import { AxiosError } from 'axios';
import TrmApi from '../index';

const trmapi = new TrmApi();

function errorHandler(error: AxiosError): void {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(`${error.response.status}: ${error.response.data.message}`);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
}

if (process.argv.length > 2) {
  trmapi
    .date(process.argv[2])
    .then(({ valor }) => console.log(valor))
    .catch(errorHandler);
} else {
  trmapi
    .latest()
    .then(({ valor }) => console.log(valor))
    .catch(errorHandler);
}
