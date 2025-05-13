/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { DisplayJsonAttribute } from './displayJsonAttribute';

export interface FieldValidator {
  id: string;
  name: string;
  regex_expression: string;
  description: string;
  scope: string;
  error_message?: string;
  display_json_attributes?: DisplayJsonAttribute;
  formula_calculation?: string;
}
