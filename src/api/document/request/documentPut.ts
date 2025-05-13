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
import { Line } from './data/line/line';
import { Check } from './data/check';
import { Radiobutton } from './data/radiobutton/radiobutton';
import { Signature } from './data/signature';
import { Text } from './data/text';
import { Attachment } from './data/attachment';
import { Hyperlink } from './data/hyperlink';
import { IntegrationObject } from './data/integrationObject';
import { DeactivateElement } from './data/deactivateElement';

export class DocumentPut implements BaseClass {
  private queryParams: Record<string, string> = {};
 
  constructor(
    private documentId: string,
    private fields: Field[],
    private lines: Line[] = [],
    private checks: Check[] = [],
    private radiobuttons: Radiobutton[] = [],
    private signatures: Signature[] = [],
    private texts: Text[] = [],
    private attachments: Attachment[] = [],
    private hyperlinks: Hyperlink[] = [],
    private integrationObjects: IntegrationObject[] = [],
    private deactivateElements: DeactivateElement[] = [],
    private documentName: string | null = null,
    private clientTimestamp: string = '',
  ) {}

  public getPayload(): Record<string, string | Field[] | Line[] | Check[] | Radiobutton[] | Signature[] | Text[] | Attachment[] | Hyperlink[] | IntegrationObject[] | DeactivateElement[] | null> {
    return {
      document_id: this.documentId,
      fields: this.fields,
      lines: this.lines,
      checks: this.checks,
      radiobuttons: this.radiobuttons,
      signatures: this.signatures,
      texts: this.texts,
      attachments: this.attachments,
      hyperlinks: this.hyperlinks,
      integration_objects: this.integrationObjects,
      deactivate_elements: this.deactivateElements,
      document_name: this.documentName,
      client_timestamp: this.clientTimestamp,
    };
  }

  public getMethod(): string {
    return HttpMethod.PUT;
  }

  public getUrl(): string {
    return '/document/{document_id}';
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
