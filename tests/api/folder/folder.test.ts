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
import { FolderGet } from '../../../src/api/folder/request/folderGet';
import { FolderGet as FolderGetResponse } from '../../../src/api/folder/response/folderGet';

describe('folderGet', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const folderGet = new FolderGet();

    const response = await client.send<FolderGetResponse>(folderGet);

    const expectation = expectationReader.get('get_folder', 'get');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
