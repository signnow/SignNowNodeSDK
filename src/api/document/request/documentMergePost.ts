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

export class DocumentMergePost implements BaseClass {
  private queryParams: Record<string, string> = {};
 
  constructor(
    private name: string,
    private documentIds: string[] = [],
    private uploadDocument: boolean = false,
  ) {}

  public getPayload(): Record<string, string | string[] | boolean> {
    return {
      name: this.name,
      document_ids: this.documentIds,
      upload_document: this.uploadDocument,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/document/merge';
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

  public getUriParams(): null {
    return null;
  }
}
