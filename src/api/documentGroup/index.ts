/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export type { DocumentGroupDelete as DocumentGroupDeleteResponse } from './response/documentGroupDelete';
export type { DocumentGroupGet as DocumentGroupGetResponse } from './response/documentGroupGet';
export type { DocumentGroupPost as DocumentGroupPostResponse } from './response/documentGroupPost';
export type { DocumentGroupRecipientsGet as DocumentGroupRecipientsGetResponse } from './response/documentGroupRecipientsGet';
export type { DownloadDocumentGroupPost as DownloadDocumentGroupPostResponse } from './response/downloadDocumentGroupPost';
export type { OriginatorOrganizationSettings as OriginatorOrganizationSettingsResponseAttribute } from './response/data/originatorOrganizationSettings';
export type { AllowedUnmappedSignDocument as DataAllowedUnmappedSignDocumentResponseAttribute } from './response/data/data/allowedUnmappedSignDocument';
export type { Attribute as DataAttributeResponseAttribute } from './response/data/data/attribute';
export type { Authentication as DataAuthenticationResponseAttribute } from './response/data/data/authentication';
export type { Data as DataResponseAttribute } from './response/data/data/data';
export type { Document as DataDocumentResponseAttribute } from './response/data/data/document';
export type { EmailGroup as DataEmailGroupResponseAttribute } from './response/data/data/emailGroup';
export type { Recipient as DataRecipientResponseAttribute } from './response/data/data/recipient';
export type { Reminder as DataReminderResponseAttribute } from './response/data/data/reminder';
export type { UnmappedDocument as DataUnmappedDocumentResponseAttribute } from './response/data/data/unmappedDocument';
export type { Document as DocumentResponseAttribute } from './response/data/document/document';
export type { Thumbnail as DocumentThumbnailResponseAttribute } from './response/data/document/thumbnail';
export { DocumentGroupDelete as DocumentGroupDeleteRequest } from './request/documentGroupDelete';
export { DocumentGroupGet as DocumentGroupGetRequest } from './request/documentGroupGet';
export { DocumentGroupPost as DocumentGroupPostRequest } from './request/documentGroupPost';
export { DocumentGroupRecipientsGet as DocumentGroupRecipientsGetRequest } from './request/documentGroupRecipientsGet';
export { DownloadDocumentGroupPost as DownloadDocumentGroupPostRequest } from './request/downloadDocumentGroupPost';