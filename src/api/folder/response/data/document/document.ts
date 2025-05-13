/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Thumbnail } from './thumbnail';
import { Role } from './role';
import { RoutingDetail } from './routingDetail';
import { FieldInvite } from './fieldInvite';
import { Signature } from './signature';
import { Seal } from './seal';
import { Text } from './text';
import { Check } from './check';
import { Radiobutton } from './radiobutton';
import { Integration } from './integration';
import { Insert } from './insert';
import { Tag } from './tag';
import { Field } from './field';
import { Request } from './request';
import { EnumerationOption } from './enumerationOption';
import { Attachment } from './attachment';
import { DocumentGroupInfo } from './documentGroupInfo';

export interface Document {
  id: string;
  user_id: string;
  document_name: string;
  page_count: string;
  created: string;
  updated: string;
  version_time: string;
  original_filename: string;
  owner: string;
  origin_user_id: string | null;
  thumbnail: Thumbnail;
  template: boolean;
  roles: Role[];
  routing_details: RoutingDetail[];
  field_invites: FieldInvite[];
  signatures: Signature[];
  seals: Seal[];
  texts: Text[];
  checks: Check[];
  radiobuttons: Radiobutton[];
  integrations: Integration[];
  inserts: Insert[];
  tags: Tag[];
  fields: Field[];
  requests: Request[];
  enumeration_options: EnumerationOption[];
  attachments: Attachment[];
  document_group_info: DocumentGroupInfo;
  origin_document_id?: string | null;
  project_id?: string | null;
  is_favorite?: boolean | null;
  recently_used?: string | null;
}
