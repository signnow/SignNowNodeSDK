/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

import fs from 'fs';
import fetch, { BodyInit, Response } from 'node-fetch';
import FormData from 'form-data';

import { Config } from './config/config';
import { BaseClass } from '../types/baseClass';
import { FileDownloader } from './response/fileDownloader';
import { HttpStatusCode } from './contstants';
import { SignNowApiException } from './error/signNowApiException';

/**
 * Client for making API requests to SignNow
 */
export class ApiClient {
  private readonly config: Config;

  private readonly fileDownloader: FileDownloader;

  constructor(
    private bearerToken?: string,
    private headers?: Record<string, string>,
  ) {
    this.config = new Config();
    this.fileDownloader = new FileDownloader(this.config);
  }

  /**
   * Sets the bearer token for authentication
   */
  public setBearerToken(bearerToken: string): void {
    this.bearerToken = bearerToken;
  }

  /**
   * Gets the bearer token
   * @returns The bearer token
   */
  public getBearerToken(): string | undefined {
    return this.bearerToken;
  }

  /**
   * Sends an API request
   * @param request The request object implementing BaseClass
   * @returns The response data
   */
  public async send<T>(request: BaseClass): Promise<T> {
    return this.makeRequest<T>(
      request.getMethod(),
      this.buildUri(request),
      this.getHeaders(request),
      this.getBody(request),
    );
  }

  /**
   * Makes an HTTP request to the API
   */
  private async makeRequest<T>(
    method: string,
    url: string,
    headers: Record<string, string>,
    body?: BodyInit
  ): Promise<T> {
    const apiUrl = `${this.config.getApiHost()}${url}`;
    const response = await fetch(apiUrl, { method, headers, body });

    this.validateResponse(response);

    const contentType = response.headers.get('content-type') || '';

    if (contentType && this.isFileContentType(contentType)) {
      const filePath = await this.fileDownloader.downloadFile(response);
      return filePath as unknown as T;
    }

    if (this.isSuccessWithNoContent(response.status)) {
      return {} as T;
    }

    return response.json();
  }

  /**
  * Checks if the response status indicates success with no content
  * @param status HTTP status code
  * @returns True if the status is 201 (Created) or 204 (No Content)
  */
  private isSuccessWithNoContent(status: number): boolean {
    return status === 201 || status === 204;
  }

  /**
   * Validates API response and throws appropriate exceptions for error status codes
   */
  private validateResponse(response: Response): void {
    const responseStatus = response.status;

    switch (true) {
      case responseStatus >= HttpStatusCode.REDIRECT && responseStatus < HttpStatusCode.CLIENT_ERROR:
        throw new SignNowApiException('SignNow API call was redirected.', response);
      case responseStatus >= HttpStatusCode.CLIENT_ERROR && responseStatus < HttpStatusCode.SERVER_ERROR:
        throw new SignNowApiException('SignNow API call was invalid.', response);
      case responseStatus >= HttpStatusCode.SERVER_ERROR:
        throw new SignNowApiException('SignNow API call has failed due to server error.', response);
    }
  }

  /**
   * Builds the URI with parameters replaced from the request
   */
  private buildUri(request: BaseClass): string {
    let uri = request.getUrl();
    const params = request.getUriParams();
    const queryParams = request.getQueryParams();

    if (params === null) {
      return uri;
    }

    for (const [paramName, paramValue] of Object.entries(params)) {
      uri = uri.replace(`{${paramName}}`, paramValue);
    }

    // Add query parameters if available
    // const queryParams = 'getQueryParams' in request ? request.getQueryParams() : null;
    if (queryParams && Object.keys(queryParams).length > 0) {
      uri = this.appendQueryParams(uri, queryParams);
    }

    return uri;
  }

  /**
   * Creates headers for the request based on authentication method and content type
   */
  private getHeaders(request: BaseClass): Record<string, string> {
    const isBasicAuth = request.getAuthMethod() === 'basic';
    const contentType = request.getContentType();
    const authValue = isBasicAuth
      ? `Basic ${this.config.getApiBasicToken()}`
      : `Bearer ${this.bearerToken}`;

    const headers: Record<string, string> = {
      ...this.headers,
      Accept: 'application/json',
      Authorization: authValue,
      'User-Agent': this.config.getClientName(),
      'Content-Type': contentType,
    };

    if (contentType === 'multipart/form-data') {
      delete headers['Content-Type'];
    }

    return headers;
  }

  /**
   * Builds the request body based on the content type and payload
   */
  private getBody(request: BaseClass): BodyInit | undefined {
    const payload = request.getPayload();
    const method = request.getMethod().toLowerCase();

    if (!payload || !['post', 'put'].includes(method)) {
      return undefined;
    }

    const contentType = request.getContentType();
    const cleanPayload = this.clearPayload(payload);

    switch (contentType) {
      case 'application/x-www-form-urlencoded':
        return this.createUrlEncodedBody(cleanPayload);

      case 'multipart/form-data':
        return this.createMultipartFormBody(cleanPayload);

      default:
        return JSON.stringify(cleanPayload);
    }
  }

  /**
   * Removes empty values, empty arrays, and null values from the payload
   * @param payload The input payload to clean
   * @returns Cleaned payload with empty values removed
   */
  private clearPayload(payload: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(payload)) {
      if (value === null || value === '') {
        continue;
      }

      if (Array.isArray(value) && value.length === 0) {
        continue;
      }

      result[key] = value;
    }

    return result;
  }

  /**
   * Creates a URL encoded form body from payload
   */
  private createUrlEncodedBody(payload: Record<string, unknown>): URLSearchParams {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }

    return searchParams;
  }

  /**
   * Creates a multipart form body from payload
   */
  private createMultipartFormBody(payload: Record<string, unknown>): FormData {
    const formData = new FormData();

    for (const [key, value] of Object.entries(payload)) {
      if (value === undefined || value === null) {
        continue;
      }

      if (key === 'file' && typeof value === 'string') {
        formData.append('file', fs.createReadStream(value));
      } else {
        formData.append(key, String(value));
      }
    }

    return formData;
  }

  /**
   * Checks if the content type indicates a file to download
   */
  private isFileContentType(contentType: string): boolean {
    return contentType.includes('application/pdf')
      || contentType.includes('application/zip');
  }

  /**
 * Appends query parameters to a URL
 * @param url Base URL to append parameters to
 * @param params Object containing query parameters
 * @returns URL with appended query parameters
 */
  private appendQueryParams(url: string, params: Record<string, string | string[] | number | boolean | null>): string {
    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach(item => {
          searchParams.append(`${key}[]`, String(item));
        });
      } else {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    if (!queryString) {
      return url;
    }

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${queryString}`;
  }
}
