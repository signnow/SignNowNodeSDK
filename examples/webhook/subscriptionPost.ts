import { SubscriptionPost } from '../../src/api/webhook/request/subscriptionPost';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';
import { SubscriptionPost as SubscriptionPostResponse } from '../../src/api/webhook/response/subscriptionPost';

export async function createWebhookSubscription(): Promise<SubscriptionPostResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data
  const event = 'user.document.open';
  const userId = 'f9e2e54a7dfa85818d6fc2b4a5425675e15d3403';// '6612b8e9ea3e4fe8aa997ea4ab43619e56a32692'; // document id or user id
  const action = 'callback';
  const attributes = {
    callback: 'https://demo.requestcatcher.com/4', // your callback url
    use_tls_12: false,
  };

  const subscriptionRequest = new SubscriptionPost(
    event,
    userId,
    action,
    attributes
  );

  const response = await client.send<SubscriptionPostResponse>(subscriptionRequest);
  return response;
}

createWebhookSubscription().then(displayResult).catch(displayResult);
