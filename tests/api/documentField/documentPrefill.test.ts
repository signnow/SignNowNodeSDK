/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { describe, expect, it } from '@jest/globals';
import { Sdk } from '../../../src/core/sdk';
import { ExpectationReader } from '../../core/mock/expectation/expectationReader';
import { Faker } from '../../core/mock/faker';
import { DocumentPrefillPut } from '../../../src/api/documentField/request/documentPrefillPut';
import { DocumentPrefillPut as DocumentPrefillPutResponse } from '../../../src/api/documentField/response/documentPrefillPut';

describe('documentPrefillPut', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentPrefillPut = new DocumentPrefillPut(
        faker.documentId(),
        faker.documentFieldDocumentPrefillFields()
    );

    const response = await client.send<DocumentPrefillPutResponse>(documentPrefillPut);

    const expectation = expectationReader.get('prefill_text_fields', 'put');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
