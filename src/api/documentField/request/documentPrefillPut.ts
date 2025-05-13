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
import { Field } from './data/field';

export class DocumentPrefillPut implements BaseClass {
  private queryParams: Record<string, string> = {};
 
  constructor(
    private documentId: string,
    private fields: Field[],
  ) {}

  public getPayload(): Record<string, string | Field[]> {
    return {
      document_id: this.documentId,
      fields: this.fields,
    };
  }

  public getMethod(): string {
    return HttpMethod.PUT;
  }

  public getUrl(): string {
    return '/v2/documents/{document_id}/prefill-texts';
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
