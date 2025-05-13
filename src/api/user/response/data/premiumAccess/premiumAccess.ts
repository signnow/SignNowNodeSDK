/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { User } from './user';
import { Subscription } from './subscription';
import { Api } from './api';

export interface PremiumAccess {
  subscription: Subscription;
  api: Api;
  error?: boolean;
  user?: User;
  active?: boolean;
  plan?: string;
  business?: boolean;
  trial?: boolean;
  credit_card?: boolean;
}
