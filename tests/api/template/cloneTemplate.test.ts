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
import { CloneTemplatePost } from '../../../src/api/template/request/cloneTemplatePost';
import { CloneTemplatePost as CloneTemplatePostResponse } from '../../../src/api/template/response/cloneTemplatePost';

describe('cloneTemplatePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const cloneTemplatePost = new CloneTemplatePost(
        faker.templateId(),
        faker.documentName(),
        faker.clientTimestampAsString(),
        faker.folderId()
    );

    const response = await client.send<CloneTemplatePostResponse>(cloneTemplatePost);

    const expectation = expectationReader.get('create_document_with_template', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
