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

export class DocumentGroupEmbeddedEditorLinkPost implements BaseClass {
  private queryParams: Record<string, string> = {};

  constructor(
    private documentGroupId: string,
    private redirectUri: string = '',
    private redirectTarget: string = '',
    private linkExpiration: number = 0,
  ) {}

  public getPayload(): Record<string, string | number> {
    return {
      document_group_id: this.documentGroupId,
      redirect_uri: this.redirectUri,
      redirect_target: this.redirectTarget,
      link_expiration: this.linkExpiration,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/v2/document-groups/{document_group_id}/embedded-editor';
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

  public getUriParams(): { document_group_id: string } {
    return {
      document_group_id: this.documentGroupId,
    };
  }
}
