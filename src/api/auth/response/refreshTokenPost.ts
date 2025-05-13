/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface RefreshTokenPost {
  expires_in: number;
  token_type: string;
  access_token: string;
  refresh_token: string;
  scope: string;
  last_login: number;
}
