/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { BaseClass } from '../../../types/baseClass';
import { HttpMethod } from '../../../core/contstants';
import { HttpAuthType } from '../../../core/contstants';
import { TemplateData } from './data/templateData';
import { TemplateDataObject } from './data/templateDataObject';
import { CcStep } from './data/ccStep';
import { Viewer } from './data/viewer';
import { Approver } from './data/approver';

export class RoutingDetailsPut implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private documentId: string,
    private templateData: TemplateData[] | null = [],
    private templateDataObject: TemplateDataObject[] | null = [],
    private cc: string[] | null = [],
    private ccStep: CcStep[] | null = [],
    private viewers: Viewer[] | null = [],
    private approvers: Approver[] | null = [],
    private inviteLinkInstructions: string[] | null = [],
  ) {}

  public getPayload(): Record<string, string | object | TemplateDataObject[] | null | string[] | CcStep[] | Viewer[] | Approver[]> {
    return {
      document_id: this.documentId,
      template_data: this.templateData,
      template_data_object: this.templateDataObject,
      cc: this.cc,
      cc_step: this.ccStep,
      viewers: this.viewers,
      approvers: this.approvers,
      invite_link_instructions: this.inviteLinkInstructions,
    };
  }

  public getMethod(): string {
    return HttpMethod.PUT;
  }

  public getUrl(): string {
    return '/document/{document_id}/template/routing/detail';
  }

  public getAuthMethod(): string {
    return HttpAuthType.BEARER;
  }

  public getContentType(): string {
    return 'application/json';
  }

  public getQueryParams(): Record<string, string> {
    return this.queryParams;
  }

  public getUriParams(): { document_id: string } {
    return {
      document_id: this.documentId,
    };
  }
}
