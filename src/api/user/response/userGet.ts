/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { Subscription } from './data/subscription';
import { CloudExportAccountDetail } from './data/cloudExportAccountDetail';
import { BillingPeriod } from './data/billingPeriod';
import { PremiumAccess } from './data/premiumAccess/premiumAccess';
import { Company } from './data/company';
import { Team } from './data/team/team';
import { Status } from './data/status';
import { Settings } from './data/settings';
import { OrganizationSettings } from './data/organizationSettings';
import { IssueNotification } from './data/issueNotification';
import { MerchantAccount } from './data/merchantAccount/merchantAccount';
import { Organization } from './data/organization';

export interface UserGet {
  id: string;
  first_name: string;
  last_name: string;
  active: string;
  verified: string;
  type: number;
  pro: number;
  created: string;
  emails: string[];
  primary_email: string;
  subscriptions: Subscription[];
  credits: number;
  has_atticus_access: boolean;
  is_logged_in: boolean;
  billing_period: BillingPeriod;
  premium_access: PremiumAccess;
  companies: Company[];
  document_count: number;
  monthly_document_count: number;
  lifetime_document_count: number;
  teams: Team[];
  google_apps: boolean;
  facebook_apps: boolean;
  microsoft_apps: boolean;
  status: Status;
  settings: Settings;
  organization_settings: OrganizationSettings[];
  issue_notifications: IssueNotification[];
  merchant_accounts: MerchantAccount[];
  cloud_export_account_details?: CloudExportAccountDetail | null;
  organization?: Organization | null;
  registration_source?: string | null;
  avatar_url?: string | null;
  signer_phone_invite?: string | null;
  locale?: string | null;
  password_changed?: number | null;
  upload_limit?: number | null;
}
