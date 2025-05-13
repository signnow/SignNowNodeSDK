/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export interface Settings {
  no_document_attachment: boolean;
  copy_export: boolean;
  no_document_file_attachments: boolean;
  no_user_signature_return: boolean;
  mobileweb_option: boolean;
  require_drawn_signatures: boolean;
  org_allowed_team_admins: boolean;
  cloud_auto_export: boolean;
  digitally_sign_dowloaded_docs: boolean;
  invite_completion_redirect_url: boolean;
  invite_decline_redirect_url: boolean;
  add_signature_stamp: boolean;
  pending_invite_document_view_notification: boolean;
  signing_link_document_download: boolean;
  required_preset_signature_name: boolean;
  cloud_export_with_history: boolean;
  emailed_docs_include_history: boolean;
  require_email_subject: boolean;
  document_completion_retention_days: boolean;
  enable_hyperlink_protection: boolean;
  enable_advanced_threat_protection: boolean;
  require_login_for_signing: boolean;
  logout_on_signing: boolean;
  audit_trail_completion_retention_days: boolean;
  front_end_session_length: boolean;
  email_admin_on_banned_login: boolean;
  add_signature_stamp_with_name: boolean;
  cfr_title21_part11: boolean;
  unsuccessful_logout_attempts_allowed: boolean;
  require_authentication_for_invites: boolean;
  electronic_consent_required: boolean;
  electronic_consent_text: boolean;
  document_guide: boolean;
  watermark_downloaded_document: boolean;
  restrict_download: boolean;
  disable_email_notifications: boolean;
  upload_limit: boolean;
  document_schema_extended: boolean;
  invite_update_notifications_for_all_invites_at_invite_create: boolean;
  enable_full_story_tracker: boolean;
  document_attachment_only_for_signer: boolean;
  sso_only_login: boolean;
  block_export_options_when_credit_card_validation_is_used: boolean;
  only_administrator_is_able_to_invite_to_the_team: boolean;
  block_login_via_social_networks: boolean;
}
