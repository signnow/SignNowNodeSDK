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
import { Data } from './data/data';

export class DocumentPrefillSmartFieldPost implements BaseClass {
  private queryParams: Record<string, string> = {};
 
  constructor(
    private documentId: string,
    private data: Data[],
    private clientTimestamp: string,
  ) {}

  public getPayload(): Record<string, string | Data[]> {
    return {
      document_id: this.documentId,
      data: this.data,
      client_timestamp: this.clientTimestamp,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/document/{document_id}/integration/object/smartfields';
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
