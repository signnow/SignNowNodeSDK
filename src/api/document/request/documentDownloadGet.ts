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

export class DocumentDownloadGet implements BaseClass {
  private queryParams: Record<string, string> = {};
 
  constructor(private documentId: string) {}

  public getPayload(): Record<string, string> {
    return {
      document_id: this.documentId,
    };
  }

  public getMethod(): string {
    return HttpMethod.GET;
  }

  public getUrl(): string {
    return '/document/{document_id}/download';
  }

  public getAuthMethod(): string {
    return HttpAuthType.BEARER;
  }

  public getContentType(): string {
    return 'application/pdf';
  }

  public getQueryParams(): Record<string, string> {
    return this.queryParams;
  }

  public getUriParams(): { document_id: string } {
    return {
      document_id: this.documentId,
    };
  }

  public withType(type: string): this {
    this.queryParams['type'] = type;

    return this;
  }

  public withHistory(withHistory: string): this {
    this.queryParams['with_history'] = withHistory;

    return this;
  }
}
