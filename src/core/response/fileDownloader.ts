/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import fs from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';
import { Response } from 'node-fetch';
import { Config } from '../config/config';

/**
 * Handles downloading and saving files from API responses
 */
export class FileDownloader {
  private readonly SANITIZE_FILENAME_REGEX = /[/\\?%*:|"<>]/g;

  private readonly FILENAME_DISPOSITION_REGEX = {
    extended: /filename\*?=['"]?(?:UTF-\d['"]?)?([^;\r\n"']*)['"]?;?/i,
    standard: /filename=['"]?([^;\r\n"']*)['"]?;?/i
  };

  private readonly contentTypeMap: Record<string, string> = {
    'application/pdf': '.pdf',
    'application/zip': '.zip'
  };

  constructor(private readonly config: Config) {}

  /**
   * Downloads a file from an API response and saves it to disk
   * @param response The API response containing the file
   * @returns The path to the saved file
   */
  public async downloadFile(response: Response): Promise<string> {
    const buffer = await this.getBufferFromResponse(response);
    const downloadDir = this.ensureDownloadDirectory();
    const contentType = response.headers.get('content-type') || '';

    let filename = this.extractFilenameFromHeaders(response);
    if (!filename) {
      filename = this.generateFileName(contentType);
    } else if (!path.extname(filename)) {
      const extension = this.getExtensionFromContentType(contentType);
      filename = `${filename}${extension}`;
    }

    const filePath = path.join(downloadDir, filename);
    this.saveBufferToFile(filePath, buffer);

    return filePath;
  }

  /**
   * Gets the appropriate file extension for a given content type
   */
  public getExtensionFromContentType(contentType: string): string {
    for (const [type, extension] of Object.entries(this.contentTypeMap)) {
      if (contentType.includes(type)) {
        return extension;
      }
    }

    return '.bin';
  }

  /**
   * Generates a unique filename with appropriate extension based on content type
   */
  public generateFileName(contentType: string): string {
    const timestamp = Date.now();
    const randomString = randomBytes(8).toString('hex');
    const extension = this.getExtensionFromContentType(contentType);

    return `document_${timestamp}_${randomString}${extension}`;
  }

  /**
   * Extracts and sanitizes the filename from response headers
   */
  private extractFilenameFromHeaders(response: Response): string {
    const contentDisposition = response.headers.get('content-disposition');
    if (!contentDisposition) {
      return '';
    }

    const filenameMatch = 
      contentDisposition.match(this.FILENAME_DISPOSITION_REGEX.extended) || 
      contentDisposition.match(this.FILENAME_DISPOSITION_REGEX.standard);
    
    if (filenameMatch && filenameMatch[1]) {
      return this.sanitizeFilename(decodeURIComponent(filenameMatch[1].trim()));
    }

    return '';
  }

  /**
   * Sanitizes a filename by replacing invalid characters
   */
  private sanitizeFilename(filename: string): string {
    return filename.replace(this.SANITIZE_FILENAME_REGEX, '_');
  }

  /**
   * Creates the download directory if it doesn't exist
   */
  private ensureDownloadDirectory(): string {
    const downloadDir = this.config.getDownloadDirectory();
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    return downloadDir;
  }

  /**
   * Converts response to buffer
   */
  private async getBufferFromResponse(response: Response): Promise<Buffer> {
    const blob = await response.blob();
    return Buffer.from(await blob.arrayBuffer());
  }

  /**
   * Saves buffer to file
   */
  private saveBufferToFile(filePath: string, buffer: Buffer): void {
    fs.writeFileSync(filePath, buffer);
  }
}
