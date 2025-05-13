/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Status {
  bad_copy_token?: boolean;
  has_copy_token?: boolean;
  has_cloud_export_token?: boolean;
  bad_cloud_export_token?: boolean;
  has_salesforce_token?: boolean;
}
