import { UserGetRequest, UserGetResponse } from '@signnow/api-client/api/user';
import { Sdk } from '@signnow/api-client/core';

export async function getUser(): Promise<UserGetResponse> {
  const sdk = new Sdk({ apiKey: '{{API_KEY}}', basicToken: '{{BASIC_TOKEN}}' });
  const client = sdk.getClient();

  const userGetRequest = new UserGetRequest();
  const response = await client.send<UserGetResponse>(userGetRequest);

  return response;
}

getUser().then(console.log, console.error); 