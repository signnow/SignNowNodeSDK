import { SubscriptionGetRequest, SubscriptionGetResponse } from '@signnow/api-client/api/webhook';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function getWebhookSubscriptions(): Promise<SubscriptionGetResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const subscriptionRequest = new SubscriptionGetRequest();
  const response = await client.send<SubscriptionGetResponse>(subscriptionRequest);
  return response;
}

getWebhookSubscriptions().then(displayResultError).catch(displayResultError); 