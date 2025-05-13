/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { faker } from '@faker-js/faker';
import { Attachment } from '../../../src/api/document/request/data/attachment';
import { Check } from '../../../src/api/document/request/data/check';
import { Data } from '../../../src/api/smartFields/request/data/data';
import { DeactivateElement } from '../../../src/api/document/request/data/deactivateElement';
import { Field as DocumentPrefillField } from '../../../src/api/documentField/request/data/field';
import { Field } from '../../../src/api/document/request/data/field';
import { Hyperlink } from '../../../src/api/document/request/data/hyperlink';
import { IntegrationObject } from '../../../src/api/document/request/data/integrationObject';
import { Line } from '../../../src/api/document/request/data/line/line';
import { Radio } from '../../../src/api/document/request/data/radiobutton/radio';
import { Radiobutton } from '../../../src/api/document/request/data/radiobutton/radiobutton';
import { Signature } from '../../../src/api/document/request/data/signature';
import { Tag } from '../../../src/api/document/request/data/tag/tag';
import { Text } from '../../../src/api/document/request/data/text';
import { RoutingDetail } from '../../../src/api/template/request/data/routingDetail/routingDetail';
import { InviteAction } from '../../../src/api/template/request/data/routingDetail/inviteAction';
import { InviteStep } from '../../../src/api/template/request/data/routingDetail/inviteStep';
import { To } from '../../../src/api/documentInvite/request/data/to';
import { CcStep } from '../../../src/api/documentInvite/request/data/ccStep';
import { Viewer } from '../../../src/api/documentInvite/request/data/viewer';
import { EmailGroup } from '../../../src/api/documentInvite/request/data/emailGroup/emailGroup';
import { Email } from '../../../src/api/documentInvite/request/data/emailGroup/email';
import { Invite as EmbeddedInvite } from '../../../src/api/embeddedInvite/request/data/invite';
import { InviteStep as GroupInviteStep } from '../../../src/api/documentGroupInvite/request/data/inviteStep/inviteStep';
import { InviteAction as GroupInviteAction } from '../../../src/api/documentGroupInvite/request/data/inviteStep/inviteAction';
import { EmailGroup as GroupEmailGroup } from '../../../src/api/documentGroupInvite/request/data/emailGroup/emailGroup';
import { Email as GroupEmail } from '../../../src/api/documentGroupInvite/request/data/emailGroup/email';
import { CompletionEmail as GroupCompletionEmail } from '../../../src/api/documentGroupInvite/request/data/completionEmail';
import { InviteEmail as ReassignGroupInviteEmail } from '../../../src/api/documentGroupInvite/request/data/inviteEmail';
import { UpdateInviteActionAttribute as GroupUpdateInviteActionAttribute } from '../../../src/api/documentGroupInvite/request/data/updateInviteActionAttribute';
import { Invite as EmbeddedGroupInvite } from '../../../src/api/embeddedGroupInvite/request/data/invite/invite';
import { Document as EmbeddedGroupInviteDocument } from '../../../src/api/embeddedGroupInvite/request/data/invite/document';
import { Signer as EmbeddedGroupInviteSigner } from '../../../src/api/embeddedGroupInvite/request/data/invite/signer';
import { AttributeRequest } from '../../../src/api/webhook';
import { AttributeRequestV2 } from '../../../src/api/webhookV2';

export class Faker {
  private faker: typeof faker;

  constructor() {
    this.faker = faker;
  }

  public uid(): string {
    return this.faker.string.alphanumeric(40).toLowerCase();
  }

  public documentId(): string {
    return this.uid();
  }

  public documentGroupId(): string {
    return this.uid();
  }

  public folderId(): string {
    return this.uid();
  }

  public templateId(): string {
    return this.uid();
  }

  public eventSubscriptionId(): string {
    return this.uid();
  }

  public callbackId(): string {
    return this.uid();
  }

  public entityId(): string {
    return this.uid();
  }

  public fieldInviteId(): string {
    return this.uid();
  }

  public inviteId(): string {
    return this.uid();
  }

  public stepId(): string {
    return this.uid();
  }

  public embeddedInviteId(): string {
    return this.uid();
  }

  public documentName(): string {
    return 'document_' + this.string();
  }

  public name(): string {
    return this.faker.person.firstName();
  }

  public email(): string {
    return this.faker.internet.email();
  }

  public url(): string {
    return this.faker.internet.url();
  }

  public redirectUri(): string {
    return this.url();
  }

  public closeRedirectUri(): string {
    return this.url();
  }

  public from(): string {
    return this.email();
  }

  public to(): string {
    return this.email();
  }

  public oldPassword(): string {
    return this.password();
  }

  public userToUpdate(): string {
    return this.email();
  }

  public replaceWithThisUser(): string {
    return this.email();
  }

  public username(): string {
    return this.faker.internet.username();
  }

  public password(): string {
    return this.faker.internet.password();
  }

  public logoutAll(): string {
    return this.string();
  }

  public scope(): string {
    return '*';
  }

  public grantType(): string {
    return 'password';
  }

  public token(): string {
    return this.faker.string.alphanumeric(64);
  }

  public refreshToken(): string {
    return this.token();
  }

  public verificationToken(): string {
    return this.token();
  }

  public reason(): string {
    return this.string();
  }

  public message(): string {
    return this.string();
  }

  public subject(): string {
    return this.string();
  }

  public saveFields(): number {
    return 0;
  }

  public makeTemplate(): number {
    return 0;
  }

  public originTemplateId(): string {
    return this.uid();
  }

  public role(suffix: string = ''): string {
    return 'Signer' + suffix;
  }

  public actionSign(): string {
    return 'sign';
  }

  public actionView(): string {
    return 'view';
  }

  public authMethod(): string {
    return this.faker.helpers.arrayElement([
      this.authMethodEmail(),
      this.authMethodMfa(),
      this.authMethodPassword(),
      this.authMethodSocial(),
      this.authMethodBiometric(),
      this.authMethodNone(),
    ]);
  }

  public authMethodEmail(): string {
    return 'email';
  }

  public authMethodMfa(): string {
    return 'mfa';
  }

  public authMethodSocial(): string {
    return 'social';
  }

  public authMethodBiometric(): string {
    return 'biometric';
  }

  public authMethodPassword(): string {
    return 'password';
  }

  public authMethodNone(): string {
    return 'none';
  }

  public linkExpiration(): number {
    return 40;
  }

  public expirationTime(): string {
    return this.faker.date.future().toISOString();
  }

  public file(): string {
    return `${__dirname}/../../_data/demo.pdf`;
  }

  public language(): string {
    return this.faker.helpers.arrayElement(['en', 'es', 'fr']);
  }

  public redirectTarget(): string {
    return this.faker.helpers.arrayElement(['blank', 'self']);
  }

  public color(): string {
    return this.faker.color.rgb({ format: 'hex' });
  }

  public dataImageBase64(): string {
    return 'data:image/png;base64,' + btoa('fakeImageData');
  }

  public callbackUrl(): string {
    return this.url();
  }

  public clientTimestamp(asString: boolean = true): string | number {
    return asString ? new Date().getTime().toString() : new Date().getTime();
  }

  public clientTimestampAsString(): string {
    return new Date().getTime().toString();
  }

  public clientTimestampAsNumber(): number {
    return new Date().getTime();
  }

  public code(): string {
    return this.string();
  }

  public documentFieldExtractTags(): Tag[] {
    return [
      {
        type: 'text',
        x: 100,
        y: 100,
        page_number: 0,
        role: 'Signer',
        required: true,
        width: 100,
        height: 16,
      },
    ];
  }

  public documentFields(): Field[] {
    return [
      {
        x: 100,
        y: 150,
        page_number: 0,
        height: 15,
        width: 20,
        type: 'text',
        required: true,
        role: 'Signer',
        custom_defined_option: false,
        name: 'field_1',
        label: 'Text Field_1',
        validator_id: this.uid(),
      },
    ];
  }

  public documentDocumentMergeDocumentIds(count: number = 2): string[] {
    const ids: string[] = [];
    for (let i = 1; i <= count; i++) {
      ids.push(this.documentId());
    }

    return ids;
  }

  public documentDeactivateElements(): DeactivateElement[] {
    return [
      {
        type: 'text',
        unique_id: this.uid(),
      },
      {
        type: 'check',
        unique_id: this.uid(),
      },
    ];
  }

  public documentLines(): Line[] {
    return [
      {
        x: 100,
        y: 100,
        width: 100,
        height: 15,
        subtype: 'line',
        page_number: 0,
        fill_color: this.color(),
        line_width: 2,
        control_points: [158.0, 100.0],
      },
    ];
  }

  public documentChecks(): Check[] {
    return [
      {
        x: 100,
        y: 100,
        width: 100,
        height: 15,
        subtype: 'check',
        page_number: 0,
      },
    ];
  }

  public documentRadiobuttons(): Radiobutton[] {
    const radio: Radio[] = [
      {
        x: 100,
        y: 100,
        width: 100,
        height: 15,
        value: 'Yes',
        checked: 0,
        page_number: 0,
      },
    ];

    return [
      {
        page_number: 0,
        x: 100,
        y: 100,
        line_height: 3,
        status: 0,
        is_printed: 0,
        size: 10,
        subtype: 'radiobutton',
        name: 'radiobutton_1',
        font: 'Arial',
        radio: radio,
      },
    ];
  }

  public documentSignatures(): Signature[] {
    return [
      {
        x: 100,
        y: 100,
        width: 100,
        height: 15,
        page_number: 0,
        data: this.dataImageBase64(),
        subtype: 'signature',
      },
    ];
  }

  public documentTexts(): Text[] {
    return [
      {
        x: 100,
        y: 100,
        size: 10,
        width: 115,
        height: 15,
        subtype: 'text',
        page_number: 0,
        data: 'Text',
        font: 'Arial',
        line_height: 3,
        field_id: this.uid(),
      },
    ];
  }

  public documentAttachments(): Attachment[] {
    return [
      {
        attachment_unique_id: this.uid(),
        field_id: this.uid(),
      },
    ];
  }

  public documentHyperlinks(): Hyperlink[] {
    return [
      {
        x: 100,
        y: 100,
        size: 3,
        width: 100,
        height: 15,
        page_number: 0,
        font: 'Arial',
        line_height: 3,
      },
    ];
  }

  public documentIntegrationObjects(): IntegrationObject[] {
    return [
      {
        x: 100,
        y: 100,
        size: 3,
        width: 100,
        height: 15,
        page_number: 0,
        font: 'Arial',
        data: 'Integration Object',
        status: 1,
        color: this.color(),
        created: this.clientTimestampAsNumber(),
        active: true,
        line_height: 3,
      },
    ];
  }

  public documentFieldDocumentPrefillFields(): DocumentPrefillField[] {
    return [
      {
        field_name: 'field_1',
        prefilled_text: 'prefilled text',
      },
    ];
  }

  public smartFieldsDocumentPrefillSmartFieldData(): Data[] {
    return [
      {
        field_name: 'to be inserted into smart field',
      },
    ];
  }

  public firstName(): string {
    return this.faker.person.firstName();
  }

  public lastName(): string {
    return this.faker.person.lastName();
  }

  public number(): string {
    return this.string();
  }

  public parseType(): string {
    return this.string();
  }

  public data(): string {
    return this.string();
  }

  public boolean(): boolean {
    return this.faker.datatype.boolean();
  }

  public routingDetails(): RoutingDetail {
    const inviteActions: InviteAction[] = [{
      email: this.email(),
      role_name: this.role(),
      action: this.actionSign(),
      document_id: this.documentId(),
      document_name: this.documentName()
    }
    ];

    const inviteSteps: InviteStep[] = [{
      order: 1,
      invite_actions: inviteActions
    }];

    return {
      invite_steps: inviteSteps,
      include_email_attachments: 1
    };
  }

  public groupName(): string {
    return 'group_' + this.string();
  }

  public documentInviteSendInviteTo(): To[] {
    return [
      {
        email: this.email(),
        role_id: this.uid(),
        role: this.role(),
        order: 1,
        subject: 'Invite to sign a document',
        message: 'Please, sign this document',
      },
    ];
  }

  public documentInviteSendInviteCc(): string[] {
    return [this.email(), this.email()];
  }

  public documentInviteFreeFormInviteCc(): string[] {
    return [this.email(), this.email()];
  }

  public documentInviteSendInviteCcStep(): CcStep[] {
    return [
      {
        name: this.name(),
        email: this.email(),
        step: 1,
      },
      {
        name: this.name(),
        email: this.email(),
        step: 2,
      },
    ];
  }

  public documentInviteSendInviteViewers(): Viewer[] {
    return [
      {
        email: this.email(),
        role: this.role(),
        order: 1,
        subject: 'Invite to sign a document',
        message: 'Please, sign this document',
      },
    ];
  }

  public documentInviteSendInviteEmailGroups(): EmailGroup[] {
    const emails: Email[] = [
      {
        email: this.email(),
      },
    ];

    return [
      {
        id: this.uid(),
        name: this.name(),
        emails: emails,
      },
    ];
  }

  public embeddedInviteDocumentInviteInvites(): EmbeddedInvite[] {
    return [
      {
        email: this.email(),
        role_id: this.uid(),
        order: 1,
        auth_method: this.authMethodNone(),
      },
    ];
  }

  public nameFormula(): string {
    return this.string();
  }

  public type(): string {
    return this.string();
  }

  public withHistory(): string {
    return 'no';
  }

  public documentGroupDocumentIds(): string[] {
    return [this.documentId(), this.documentId()];
  }

  public documentGroupDownloadDocumentGroupDocumentOrder(): string[] {
    return [this.documentId(), this.documentId()];
  }

  public documentGroupInviteGroupInviteInviteSteps(): GroupInviteStep[] {
    const actions: GroupInviteAction[] = [
      {
        email: this.email(),
        role_name: this.role(),
        action: this.actionSign(),
        document_id: this.documentId(),
      },
    ];

    return [
      {
        order: 1,
        invite_actions: actions,
      },
    ];
  }

  public documentGroupInviteGroupInviteCc(): string[] {
    return [this.email(), this.email()];
  }

  public documentGroupInviteGroupInviteEmailGroups(): GroupEmailGroup[] {
    const emails: GroupEmail[] = [{ email: this.email() }, { email: this.email() }];

    return [
      {
        id: this.uid(),
        name: this.name(),
        emails: emails,
      },
    ];
  }

  public documentGroupInviteGroupInviteCompletionEmails(): GroupCompletionEmail[] {
    return [
      {
        email: this.email(),
        disable_document_attachment: 0,
        subject: this.subject(),
        message: this.message(),
      },
    ];
  }

  public documentGroupInviteReassignSignerInviteEmail(): ReassignGroupInviteEmail {
    return {
      email: this.email(),
    };
  }

  public documentGroupInviteReassignSignerUpdateInviteActionAttributes(): GroupUpdateInviteActionAttribute[] {
    return [
      {
        document_id: this.documentId(),
      },
    ];
  }

  public embeddedGroupInviteGroupInviteInvites(): EmbeddedGroupInvite[] {
    const documents: EmbeddedGroupInviteDocument[] = [{
      id: this.documentId(),
      role: this.role(),
      action: this.actionSign()
    }];

    const signers: EmbeddedGroupInviteSigner[] = [{
      email: this.email(),
      auth_method: this.authMethodNone(),
      documents: documents,
      first_name: this.firstName(),
      last_name: this.lastName()
    }];

    return [{
      order: 1,
      signers: signers
    }];
  }

  public ccSubject(): string {
    return this.string();
  }

  public ccMessage(): string {
    return this.string();
  }

  public event(): string {
    return this.string();
  }

  public action(): string {
    return this.string();
  }

  public secretKey(): string {
    return this.string();
  }

  public webhookSubscriptionAttributes(): AttributeRequest {
    return {
      callback: this.url(),
    };
  }

  public webhookV2EventSubscriptionAttributes(): AttributeRequestV2 {
    return {
      callback: this.url(),
    };
  }

  private string(): string {
    return this.faker.word.noun();
  }
}
