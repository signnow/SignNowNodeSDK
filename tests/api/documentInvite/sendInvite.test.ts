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
import { SendInvitePost } from '../../../src/api/documentInvite/request/sendInvitePost';
import { SendInvitePost as SendInvitePostResponse } from '../../../src/api/documentInvite/response/sendInvitePost';

describe('sendInvitePost', () => {
  it('Should return correct response', async () => {
    const sdk = await new Sdk().authenticate();
    const expectationReader = new ExpectationReader();
    const client = sdk.getClient();
    const faker = new Faker();
    const sendInvitePost = new SendInvitePost(
        faker.documentId(),
        faker.documentInviteSendInviteTo(),
        faker.from(),
        faker.subject(),
        faker.message(),
        faker.documentInviteSendInviteEmailGroups(),
        faker.documentInviteSendInviteCc(),
        faker.documentInviteSendInviteCcStep(),
        faker.documentInviteSendInviteViewers(),
        faker.ccSubject(),
        faker.ccMessage()
    );

    const response = await client.send<SendInvitePostResponse>(sendInvitePost);

    const expectation = expectationReader.get('send_field_invite', 'post');

    expect(response).toEqual(JSON.parse(expectation.getBody()));
  });
});
