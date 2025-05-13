/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { SignNowApiException } from './signNowApiException';

export async function displayResult(result: unknown): Promise<void> {
  if (result instanceof Error) {
    if (result instanceof SignNowApiException) {
      try {
        const response = result.getResponse();
        const responseText = await response.text();
        console.error('Error response:', JSON.parse(responseText));
      } catch (err) {
        console.error('Error parsing response text:', err instanceof Error ? err.message : err);
      }
    } else {
      console.error('Error message:', result.message);
    }
  } else {
    console.log('API response:', result);
  }
}
