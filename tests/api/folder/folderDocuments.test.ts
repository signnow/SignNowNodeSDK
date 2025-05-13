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
import { FolderDocumentsGet } from '../../../src/api/folder/request/folderDocumentsGet';
import { FolderDocumentsGet as FolderDocumentsGetResponse } from '../../../src/api/folder/response/folderDocumentsGet';

describe('folderDocumentsGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const folderDocumentsGet = new FolderDocumentsGet(
        faker.folderId()
    );

    const response = await client.send<FolderDocumentsGetResponse>(folderDocumentsGet);

    const expectation = expectationReader.get('get_folder_documents', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
