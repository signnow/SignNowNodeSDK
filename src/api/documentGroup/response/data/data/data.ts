/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Recipient } from './recipient';
import { UnmappedDocument } from './unmappedDocument';
import { AllowedUnmappedSignDocument } from './allowedUnmappedSignDocument';

export interface Data {
  recipients: Recipient[];
  unmapped_documents: UnmappedDocument[];
  allowed_unmapped_sign_documents: AllowedUnmappedSignDocument[];
  cc: string[];
}
