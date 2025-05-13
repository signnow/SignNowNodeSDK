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
import { GroupTemplateGet } from '../../../src/api/template/request/groupTemplateGet';
import { GroupTemplateGet as GroupTemplateGetResponse } from '../../../src/api/template/response/groupTemplateGet';
import { GroupTemplatePut } from '../../../src/api/template/request/groupTemplatePut';
import { GroupTemplatePut as GroupTemplatePutResponse } from '../../../src/api/template/response/groupTemplatePut';

describe('groupTemplateGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const groupTemplateGet = new GroupTemplateGet(
        faker.templateId()
    );

    const response = await client.send<GroupTemplateGetResponse>(groupTemplateGet);

    const expectation = expectationReader.get('get_document_group_template', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});

describe('groupTemplatePut', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const groupTemplatePut = new GroupTemplatePut(
        faker.templateId(),
        faker.routingDetails(),
        faker.groupName()
    );

    const response = await client.send<GroupTemplatePutResponse>(groupTemplatePut);

    const expectation = expectationReader.get('update_document_group_template', 'put');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
