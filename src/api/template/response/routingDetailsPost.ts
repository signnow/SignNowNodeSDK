/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { RoutingDetail } from './data/routingDetail';
import { CcStep } from './data/ccStep';
import { Viewer } from './data/viewer';
import { Approver } from './data/approver';

export interface RoutingDetailsPost {
  routing_details: RoutingDetail[];
  cc?: string[];
  cc_step?: CcStep[];
  viewers?: Viewer[];
  approvers?: Approver[];
  invite_link_instructions?: string[];
}
