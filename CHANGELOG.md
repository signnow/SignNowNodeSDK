# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.3.0] - 2019-08-01

### Added

- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/samples/applets/extract-fields.js) for testing *Upload Document with Field Extraction* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/samples/applets/view-document.js) for testing *View Document* method

## [v1.2.0] - 2019-07-18

### Added

- Added `.odt`, `.rtf`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.xml`, `.xls`, `.xlsx`, `.ppt`, `.pptx` to the list of acceptable file formats for document uploading
- Generated and deployed [API Reference](https://signnow.github.io/SignNowNodeSDK/) for API Client
- Added example of Creating Field Invite in [README](https://github.com/signnow/SignNowNodeSDK/blob/master/README.md)
- Documented [*user*](https://signnow.github.io/SignNowNodeSDK/class/lib/user.js~User.html) methods
- Documented [*oauth2*](https://signnow.github.io/SignNowNodeSDK/class/lib/oauth2.js~OAuth2.html) methods
- Partially documented [*document*](https://signnow.github.io/SignNowNodeSDK/class/lib/document.js~Document.html) methods
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/samples/applets/create-user.js) for testing *Create User* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/samples/applets/get-access-token.js) for testing *Request Token* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/samples/applets/create-document.js) for testing *Create Document* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/samples/applets/update-document.js) for testing *Update Document* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/samples/applets/create-field-invite.js) for testing *Creation of Field Invite* with *Document Invite* method
- Created [Applet](https://github.com/signnow/SignNowNodeSDK/blob/master/samples/applets/create-freeform-invite.js) for testing *Creation of Freeform Invite* with *Document Invite* method
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

[v1.3.0]: https://github.com/signnow/SignNowNodeSDK/compare/v1.2.0...v1.3.0
[v1.2.0]: https://github.com/signnow/SignNowNodeSDK/compare/v1.1.4...v1.2.0
