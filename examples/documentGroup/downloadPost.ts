import { DownloadDocumentGroupPost } from '../../src/api/documentGroup/request/downloadDocumentGroupPost';
import { displayResult } from '../../src/core/error/displayResult';
import { Sdk } from '../../src/core/sdk';

export async function downloadDocumentGroup(documentGroupId: string): Promise<Buffer> {
  const sdk = await new Sdk().authenticate();
  const client = sdk.getClient();

  const downloadDocumentGroup = new DownloadDocumentGroupPost(
    documentGroupId,
    'merged',  // type: 'merged' to combine all document PDFs into one, 'zip' for ZIP archive, etc.
    'no',      // withHistory: 'yes' or 'no' for including document history
    []         // documentOrder: optional array of document IDs to specify order
  );

  const response = await client.send<Buffer>(downloadDocumentGroup);

  return response;
}

downloadDocumentGroup('a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6').then(displayResult).catch(displayResult);
