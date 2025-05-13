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

export class DocumentPost implements BaseClass {
  private queryParams: Record<string, string> = {};
 
  constructor(
    private file: string,
    private name: string = '',
    private checkFields: boolean = false,
    private saveFields: number = 0,
    private makeTemplate: number = 0,
    private password: string | null = null,
    private folderId: string | null = null,
    private originTemplateId: string | null = null,
    private clientTimestamp: number = 0,
  ) {}

  public getPayload(): Record<string, string | boolean | number | null> {
    return {
      file: this.file,
      name: this.name,
      check_fields: this.checkFields,
      save_fields: this.saveFields,
      make_template: this.makeTemplate,
      password: this.password,
      folder_id: this.folderId,
      origin_template_id: this.originTemplateId,
      client_timestamp: this.clientTimestamp,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/document';
  }

  public getAuthMethod(): string {
    return HttpAuthType.BEARER;
  }

  public getContentType(): string {
    return 'multipart/form-data';
  }

  public getQueryParams(): Record<string, string> {
    return this.queryParams;
  }

  public getUriParams(): null {
    return null;
  }
}
