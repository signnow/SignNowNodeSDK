/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import * as fs from 'fs';
import * as path from 'path';
import { Expectation } from './expectation';
import { MockConfig } from '../mockConfig';
import { RuntimeTestException } from '../../exception/runtimeTestException';

export class ExpectationReader {
  private static JSON_EXTENSION: string = '.json';

  private readonly expectationDirectory: string;

  private mockConfig: MockConfig;

  constructor() {
    this.mockConfig = new MockConfig;
    this.expectationDirectory = this.readExpectationDirectory();
  }

  public get(actionName: string, methodName: string): Expectation {
    const fileName = this.getExpectationFileName(actionName, methodName);
    const filePath = this.getExpectationFilePath(fileName);

    if (!fs.existsSync(filePath)) {
      throw new RuntimeTestException(`Not found expectation file ${fileName} in ${this.getExpectationDirectory()}.`);
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent);
      return new Expectation(fileName, data.response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new RuntimeTestException(`Failed to load Expectation file: ${error.message}`);
      }

      throw new RuntimeTestException('Failed to load Expectation file: Unknown error');
    }
  }

  public getExpectationDirectory(): string {
    return this.expectationDirectory;
  }

  private readExpectationDirectory(): string {
    if (!this.mockConfig.expectationsDir) {
      throw new RuntimeTestException('Not found required key "expectations-dir" in .phiremock config file.');
    }

    return this.mockConfig.expectationsDir;
  }

  private getExpectationFilePath(fileName: string): string {
    return path.join(this.expectationDirectory, fileName);
  }

  private getExpectationFileName(actionName: string, methodName: string): string {
    return `${actionName}_${methodName.toLowerCase()}${ExpectationReader.JSON_EXTENSION}`;
  }
}
