import { SubscriptionGet } from '../../src/api/webhook/request/subscriptionGet';
import { SubscriptionGet as SubscriptionGetResponse } from '../../src/api/webhook/response/subscriptionGet';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

export async function getWebhookSubscriptions(): Promise<SubscriptionGetResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const subscriptionRequest = new SubscriptionGet();
  const response = await client.send<SubscriptionGetResponse>(subscriptionRequest);
  return response;
}

getWebhookSubscriptions().then(displayResult).catch(displayResult);
