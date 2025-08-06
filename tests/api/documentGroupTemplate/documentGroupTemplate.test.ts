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
import { DocumentGroupTemplatePost } from '../../../src/api/documentGroupTemplate/request/documentGroupTemplatePost';
import { DocumentGroupTemplatePost as DocumentGroupTemplatePostResponse } from '../../../src/api/documentGroupTemplate/response/documentGroupTemplatePost';

describe('documentGroupTemplatePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const documentGroupTemplatePost = new DocumentGroupTemplatePost(
        faker.templateGroupId(),
        faker.groupName(),
        faker.clientTimestampAsString(),
        faker.folderId()
    );

    const response = await client.send<DocumentGroupTemplatePostResponse>(documentGroupTemplatePost);

    const expectation = expectationReader.get('create_document_group_from_template', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
