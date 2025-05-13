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
import { Tag } from './data/tag/tag';

export class FieldExtractPost implements BaseClass {
  private queryParams: Record<string, string> = {};
 
  constructor(
    private file: string,
    private tags: Tag[] = [],
    private parseType: string = 'default',
    private password: string | null = null,
    private clientTimestamp: number = 0,
  ) {}

  public getPayload(): Record<string, string | Tag[] | null | number> {
    return {
      file: this.file,
      tags: this.tags,
      parse_type: this.parseType,
      password: this.password,
      client_timestamp: this.clientTimestamp,
    };
  }

  public getMethod(): string {
    return HttpMethod.POST;
  }

  public getUrl(): string {
    return '/document/fieldextract';
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
