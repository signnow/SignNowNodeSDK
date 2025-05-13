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
import { FieldsGet } from '../../../src/api/document/request/fieldsGet';
import { FieldsGet as FieldsGetResponse } from '../../../src/api/document/response/fieldsGet';

describe('fieldsGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const fieldsGet = new FieldsGet(
        faker.documentId()
    );

    const response = await client.send<FieldsGetResponse>(fieldsGet);

    const expectation = expectationReader.get('get_document_fields', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
