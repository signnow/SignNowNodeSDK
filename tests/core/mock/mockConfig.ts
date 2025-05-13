/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

export class MockConfig {
  public readonly port: number;

  public readonly ip: string;

  public readonly expectationsDir: string;

  public readonly debug: number;

  constructor() {
    this.port = 8086;
    this.ip = '0.0.0.0';
    this.expectationsDir = `${__dirname}/../../resources/wiremock/mappings`;
    this.debug = 1;
  }
}
