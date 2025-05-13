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
import { DocumentGroupRecipientsGet } from '../../../src/api/documentGroup/request/documentGroupRecipientsGet';
import { DocumentGroupRecipientsGet as DocumentGroupRecipientsGetResponse } from '../../../src/api/documentGroup/response/documentGroupRecipientsGet';

describe('documentGroupRecipientsGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentGroupRecipientsGet = new DocumentGroupRecipientsGet(
        faker.documentGroupId()
    );

    const response = await client.send<DocumentGroupRecipientsGetResponse>(documentGroupRecipientsGet);

    const expectation = expectationReader.get('get_document_group_recipients', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
