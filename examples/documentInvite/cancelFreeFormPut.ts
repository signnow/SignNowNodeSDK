import { CancelFreeFormInvitePutRequest, CancelFreeFormInvitePutResponse } from '@signnow/api-client/api/documentInvite';
import { displayResultError, Sdk } from '@signnow/api-client/core';

export async function cancelFreeFormInvite(): Promise<CancelFreeFormInvitePutResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data:
  // you can use inviteId = response.id
  // when calling the example from ./freeForm.ts.
  const inviteId = '12ed3bade98041ee92f9c43c3012ddefbdead045';
  const cancelReason = 'The invite was sent by mistake.';

  // Cancel the free-form invite
  const cancelFreeFormInvite = new CancelFreeFormInvitePutRequest(
    inviteId,
    cancelReason
  );

  const response = await client.send<CancelFreeFormInvitePutResponse>(cancelFreeFormInvite);

  return response;
}

cancelFreeFormInvite().then(displayResultError).catch(displayResultError); 