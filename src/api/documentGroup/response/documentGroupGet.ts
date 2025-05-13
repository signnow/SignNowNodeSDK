/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Document } from './data/document/document';
import { OriginatorOrganizationSettings } from './data/originatorOrganizationSettings';

export interface DocumentGroupGet {
  id: string;
  group_name: string;
  documents: Document[];
  originator_organization_settings: OriginatorOrganizationSettings[];
  invite_id?: string | null;
}
