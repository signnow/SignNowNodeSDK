# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.7.0] - Unreleased Phase 6

### Added
- Implemented *Send Verification Email* feature with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#verify-email)
- Created CLI [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/verify-email.js) for *Send Verification Email* feature

### Changed

## [v1.6.0] - Unreleased Phase 5

### Added
- Implemented *Cancel Free Form Invite* feature with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#cancel-freeform-invite)
- Created CLI [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/cancel-freeform-invite.js) for *Cancel Free Form Invite* feature
- Implemented *Cancel Free Form Invite* feature with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#cancel-freeform-invite)
- Created CLI [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/cancel-freeform-invite.js) for *Cancel Free Form Invite* feature
- Implemented *Cancel Field Invite* feature with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#cancel-field-invite)
- Added *promisify* utility to common utilities with usage [example](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#promisify)
- Implemented *View Document Group Template* feature with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#view-documentgroup-template)
- Implemented *View Document Group Template* feature with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#view-documentgroup-template)
- Implemented *View Document Group* feature with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#view-document-group)
- Implemented *Create Invite to Sign Document Group Template* feature with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#invite-documentgroup-template)
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/share-document.js) for testing of creation download link with *Share Document* method
- Documented *Share Document* feature in [*Document*](https://signnow.github.io/SignNowNodeSDK/class/lib/document.js~Document.html) class

### Changed

- `role_id` parameter in signer configurations in *Create Document Field Invite* feature made optional for easier invite creation
- Added optional ability to download document with history in *Download Document* feature
- Updated documentation of *Download Document* feature
- Updated example of download document in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#download-document)
- Added handling of specific 404 error response from API
- Removed validation for existing signatures and free from invites of documents intended for Document Group creation
- Changed internal implementation of `cancelInvite` method in *Document* class to use new *Cancel Field Invite* feature under the hood
- Updated the [example](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#cancel-field-invite) of *Cancel Field Invite* feature usage
- Added optional ability to cancel document invites during deletion in *Remove Document* feature
- Applied *promisify* utility to CLI applets
- Added links to CLI applets and full examples into [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md)

### Deprecated

- `cancelInvite` method in *Document* class is about to be replaced with `cancelFieldInvite` to better fit its purpose

## [v1.5.0] - Unreleased Phase 4

### Added

- Implemented *Refresh Access Token* method with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#refresh-token)
- Implemented *Remove Template* method with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#remove-template)
- Updated documentation with *Get Document History* feature description
- Implemented *Create Document Group Template* feature with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#create-document-group-template)
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/create-document-group-template.js) for testing creating of document group template with *Create Document Group Template* method
- Implemented *Create Document Group Invite* feature with documentation and example in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#document-group-invite)
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/document-group-invite.js) for testing creating of document group invite with *Create Document Group Invite* method

### Changed

- Added validation in *Create Signing Link* method: a document must have at least one role that does not have a fixed e-mail to create an invite link
- Added optional ability to remove original documents after merging documents in *Merge Documents* feature
- Updated example of merging documents in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#merge-documents)

## [v1.4.0] - 2019-08-08

### Added

- Implemented *Document Group Create* method with ability to create document group
- Documented [*documentGroup*](https://signnow.github.io/SignNowNodeSDK/class/lib/documentGroup.js~DocumentGroup.html) methods
- Documented [*link*](https://signnow.github.io/SignNowNodeSDK/class/lib/link.js~Link.html) methods
- Added example of *Create Document Group* into [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#create-document-group)
- Added example of *Create Signing Link* usage into [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#create-signing-link)
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/create-document-group.js) for testing creating of document group with *Create Document Group* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/create-signing-link.js) for testing creation of url signing link with *Create Signing Link* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/verify-access-token.js) for verifying access token with *Verify Access Token* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/user-info.js) for testing getting a detailed information about user with *Retrieve User Info* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/document-list.js) for testing getting a document list of specific user with *Retrieve User Document List* method

## [v1.3.1] - 2019-08-01

### Changed

- Updated [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md)

## [v1.3.0] - 2019-08-01

### Added

- Implemented *Remove Document* method
- Added example how to utilize *Remove Document* method into [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#remove-document)
- Implemented *Template Invite* method with ability to send field and freeform invites
- Added examples of *Template Field Invite* and *Template Freeform Invite* into [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md#template-field-invite)
- Documented [*template*](https://signnow.github.io/SignNowNodeSDK/class/lib/template.js~Template.html) methods
- Extended the description of update method in [*document*](https://signnow.github.io/SignNowNodeSDK/class/lib/document.js~Document.html) module
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/extract-fields.js) for testing *Upload Document with Field Extraction* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/view-document.js) for testing *View Document* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/download-document.js) for testing *Download Document* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/remove-document.js) for testing *Remove Document* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/create-template.js) for testing *Create Template* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/template-field-invite.js) for testing field invite with *Template Invite* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/template-freeform-invite.js) for testing freeform invite with *Template Invite* method

### Changed

- Added optional ability to remove original document after template creation in *Create Template* method

### Fixed

- Made fix of download document bug related to encoding of binary data

## [v1.2.0] - 2019-07-18

### Added

- Added `.odt`, `.rtf`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.xml`, `.xls`, `.xlsx`, `.ppt`, `.pptx` to the list of acceptable file formats for document uploading
- Generated and deployed [API Reference](https://signnow.github.io/SignNowNodeSDK/) for API Client
- Added example of Creating Field Invite in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md)
- Documented [*user*](https://signnow.github.io/SignNowNodeSDK/class/lib/user.js~User.html) methods
- Documented [*oauth2*](https://signnow.github.io/SignNowNodeSDK/class/lib/oauth2.js~OAuth2.html) methods
- Partially documented [*document*](https://signnow.github.io/SignNowNodeSDK/class/lib/document.js~Document.html) methods
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/create-user.js) for testing *Create User* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/get-access-token.js) for testing *Request Token* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/create-document.js) for testing *Create Document* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/update-document.js) for testing *Update Document* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/create-field-invite.js) for testing *Creation of Field Invite* with *Document Invite* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/bin/create-freeform-invite.js) for testing *Creation of Freeform Invite* with *Document Invite* method
- Added [Change Log](https://github.com/signnow/SignNowNodeSDK/blob/master/CHANGELOG.md)
- Added [License](https://github.com/signnow/SignNowNodeSDK/blob/master/LICENSE.md)
- Integrated code linter ([ESLint](https://eslint.org/))
- Integrated doc generator ([ESDoc](https://esdoc.org/))

### Changed

- Updated examples, links and contact information in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md)
- Created and applied common request options builder
- Created and applied common response handler builder
- Created and applied common error handler builder

### Fixed

- Made fix of feature bug related to `Content-Length` header in requests

[v1.7.0]: https://github.com/signnow/SignNowNodeSDK/compare/v1.6.0...HEAD
[v1.6.0]: https://github.com/signnow/SignNowNodeSDK/compare/v1.5.0...v1.6.0
[v1.5.0]: https://github.com/signnow/SignNowNodeSDK/compare/v1.4.0...v1.5.0
[v1.4.0]: https://github.com/signnow/SignNowNodeSDK/compare/v1.3.1...v1.4.0
[v1.3.1]: https://github.com/signnow/SignNowNodeSDK/compare/v1.3.0...v1.3.1
[v1.3.0]: https://github.com/signnow/SignNowNodeSDK/compare/v1.2.0...v1.3.0
[v1.2.0]: https://github.com/signnow/SignNowNodeSDK/compare/v1.1.4...v1.2.0
