/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface DisplayJsonAttribute {
  web_short_name: string;
  web_description: string;
  common: boolean;
  disabled: boolean;
  date_time_field_order?: number | null;
  text_field_order?: number | null;
  web_locale_key?: string;
}
