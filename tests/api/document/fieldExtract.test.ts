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
import { FieldExtractPost } from '../../../src/api/document/request/fieldExtractPost';
import { FieldExtractPost as FieldExtractPostResponse } from '../../../src/api/document/response/fieldExtractPost';

describe('fieldExtractPost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const fieldExtractPost = new FieldExtractPost(
        faker.file(),
        faker.documentFieldExtractTags(),
        faker.parseType(),
        faker.password(),
        faker.clientTimestampAsNumber()
    );

    const response = await client.send<FieldExtractPostResponse>(fieldExtractPost);

    const expectation = expectationReader.get('upload_document_with_tags_extract', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
