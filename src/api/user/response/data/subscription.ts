/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { GatewaySubscription } from './gatewaySubscription';

export interface Subscription {
  id: string;
  subscription_id: string;
  name: string;
  expired: number;
  created: number;
  updated: number;
  plan: string;
  mobile_plan_type: string;
  credit_card: boolean;
  trial: boolean;
  term: number;
  seat_admin_email: string;
  plan_version: number;
  is_usage_based: boolean;
  is_usage_based_seat_free: boolean;
  gateway_subscription?: GatewaySubscription;
}
