/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Domain } from './domain';
import { Logo } from './logo';
import { ActiveLogo } from './activeLogo';
import { Team } from './team';

export interface Organization {
  is_admin: boolean;
  is_superadmin: boolean;
  is_workspace: boolean;
  id?: string;
  name?: string;
  deleted?: string;
  created?: string;
  updated?: string;
  domains?: Domain[];
  logos?: Logo[];
  active_logo?: ActiveLogo[];
  teams?: Team[];
}
