/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Page } from './data/page';
import { EntityLabel } from './data/entityLabel';
import { RoutingDetail } from './data/routingDetail/routingDetail';
import { Thumbnail } from './data/thumbnail';
import { Signature } from './data/signature';
import { Tag } from './data/tag';
import { Field } from './data/field';
import { Role } from './data/role';
import { ViewerRole } from './data/viewerRole';
import { FieldInvite } from './data/fieldInvite/fieldInvite';
import { ViewerFieldInvite } from './data/viewerFieldInvite/viewerFieldInvite';
import { SigningSessionSettings } from './data/signingSessionSettings';
import { EnumerationOption } from './data/enumerationOption';
import { Payment } from './data/payment';
import { Integration } from './data/integration';
import { IntegrationObject } from './data/integrationObject';
import { ExportedTo } from './data/exportedTo/exportedTo';
import { Radiobutton } from './data/radiobutton/radiobutton';
import { Seal } from './data/seal';
import { Check } from './data/check';
import { Text } from './data/text';
import { Line } from './data/line/line';
import { Attachment } from './data/attachment';
import { Hyperlink } from './data/hyperlink';
import { Request } from './data/request/request';
import { Insert } from './data/insert';
import { FieldsData } from './data/fieldsData';
import { FieldValidator } from './data/fieldValidator';
import { OriginatorOrganizationSettings } from './data/originatorOrganizationSettings';
import { DocumentGroupInfo } from './data/documentGroupInfo';
import { DocumentGroupTemplateInfo } from './data/documentGroupTemplateInfo';
import { Settings } from './data/settings';
import { ShareInfo } from './data/shareInfo';

export interface DocumentGet {
  id: string;
  user_id: string;
  document_name: string;
  page_count: string;
  created: number;
  updated: number;
  original_filename: string;
  owner: string;
  owner_name: string;
  template: boolean;
  parent_id: string;
  originator_logo: string;
  pages: Page[];
  version_time: number;
  routing_details: RoutingDetail[];
  thumbnail: Thumbnail;
  signatures: Signature[];
  tags: Tag[];
  fields: Field[];
  roles: Role[];
  viewer_roles: ViewerRole[];
  signing_session_settings: SigningSessionSettings;
  originator_organization_settings: OriginatorOrganizationSettings[];
  document_group_info: DocumentGroupInfo;
  settings: Settings;
  share_info: ShareInfo;
  origin_user_id?: string | null;
  origin_document_id?: string | null;
  recently_used?: string;
  default_folder?: string;
  entity_labels?: EntityLabel[];
  field_invites?: FieldInvite[];
  viewer_field_invites?: ViewerFieldInvite[];
  enumeration_options?: EnumerationOption[];
  payments?: Payment[];
  integrations?: Integration[];
  integration_objects?: IntegrationObject[];
  exported_to?: ExportedTo[];
  radiobuttons?: Radiobutton[];
  seals?: Seal[];
  checks?: Check[];
  texts?: Text[];
  lines?: Line[];
  attachments?: Attachment[];
  hyperlinks?: Hyperlink[];
  requests?: Request[];
  inserts?: Insert[];
  fields_data?: FieldsData[];
  field_validators?: FieldValidator[];
  document_group_template_info?: DocumentGroupTemplateInfo[];
}
