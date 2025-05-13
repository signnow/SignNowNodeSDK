/*
 * This file is a part of signNow SDK API client.
 *
 * (с) Copyright © 2011-present airSlate Inc. (https://www.signnow.com)
 *
 * For more details on copyright, see LICENSE.md file
 * that was distributed with this source code.
 */

type PaginationObjectLinks = {
  next?: string;
  previous?: string;
};

type PaginationLinks = PaginationObjectLinks | string[];

interface Pagination {
  count: number;
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
  links?: PaginationLinks;
}

export interface MetaPagination {
  pagination: Pagination;
}