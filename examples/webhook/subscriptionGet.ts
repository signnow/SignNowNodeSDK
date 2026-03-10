import { SubscriptionGetRequest, SubscriptionGetResponse } from '@signnow/api-client/api/webhook';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function getWebhookSubscriptions(): Promise<SubscriptionGetResponse> {
  const sdk = new Sdk({ apiKey: '{{API_KEY}}', basicToken: '{{BASIC_TOKEN}}' });
  const client = sdk.getClient();

  const subscriptionRequest = new SubscriptionGetRequest();
  const response = await client.send<SubscriptionGetResponse>(subscriptionRequest);
  return response;
}

getWebhookSubscriptions().then(displayResultError).catch(displayResultError); 