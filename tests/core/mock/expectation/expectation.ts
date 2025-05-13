/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import { RuntimeTestException } from '../../exception/runtimeTestException';

export class Expectation {
  private readonly name: string;

  private readonly data: Record<string, string>;

  constructor(name: string, data: Record<string, string>) {
    this.name = name;
    this.data = data;
  }

  public getName(): string {
    return this.name;
  }

  public get(name: string): string {
      if (name.startsWith('get')) {
        name = name.slice(3);
      }

      if (!name) {
          throw new RuntimeTestException('Invalid expectation method usage.');
      }

    const key = this.convertCamelCaseToSnakeCase(name);
    const parsedBody = JSON.parse(this.getBody());

    if (!(key in parsedBody)) {
      throw new RuntimeTestException('Invalid expectation property is called.');
    }

    return this.data[name];
  }

  private convertCamelCaseToSnakeCase(value: string): string {
    return value.replace(/([A-Z])/g, '_$1').toLowerCase();
  }

  public getBody(): string {
    return this.data.body;
  }
}
