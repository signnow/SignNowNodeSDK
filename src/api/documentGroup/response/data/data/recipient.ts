/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { EmailGroup } from './emailGroup';
import { Attribute } from './attribute';
import { Document } from './document';

export interface Recipient {
  name: string;
  email: string;
  order: number;
  documents: Document[];
  email_group?: EmailGroup;
  attributes?: Attribute;
}
