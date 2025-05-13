import { CancelFreeFormInvitePut } from '../../src/api/documentInvite/request/cancelFreeFormInvitePut';
import { CancelFreeFormInvitePut as CancelFreeFormInvitePutResponse } from '../../src/api/documentInvite/response/cancelFreeFormInvitePut';
import { Sdk } from '../../src/core/sdk';
import { displayResult } from '../../src/core/error/displayResult';

export async function cancelFreeFormInvite(): Promise<CancelFreeFormInvitePutResponse> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  // Source data:
  // you can use inviteId = response.id
  // when calling the example from ./freeForm.ts.
  const inviteId = '12ed3bade98041ee92f9c43c3012ddefbdead045';
  const cancelReason = 'The invite was sent by mistake.';

  // Cancel the free-form invite
  const cancelFreeFormInvite = new CancelFreeFormInvitePut(
    inviteId,
    cancelReason
  );

  const response = await client.send<CancelFreeFormInvitePutResponse>(cancelFreeFormInvite);

  return response;
}

cancelFreeFormInvite().then(displayResult).catch(displayResult);
