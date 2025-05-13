/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Viewer {
  email: string;
  role: string;
  order: number;
  subject: string;
  message: string;
  close_redirect_uri?: string;
  redirect_target?: string;
}
