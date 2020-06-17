/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Items } from '../models/items';
import { ItemsPage } from '../models/items-page';

@Injectable({
  providedIn: 'root',
})
export class ItemsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getItems
   */
  static readonly GetItemsPath = '/items/item/{providerName}';

  /**
   * a list of items from a provider from submitted item ids.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItems()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItems$Response(params: {

    /**
     * provider name of the item
     */
    providerName: string;

    /**
     * provider item ids
     */
    providerItemIds: Array<string>;

  }): Observable<StrictHttpResponse<Items>> {

    const rb = new RequestBuilder(this.rootUrl, ItemsService.GetItemsPath, 'get');
    if (params) {

      rb.path('providerName', params.providerName, {});
      rb.query('providerItemIds', params.providerItemIds, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Items>;
      })
    );
  }

  /**
   * a list of items from a provider from submitted item ids.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getItems$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItems(params: {

    /**
     * provider name of the item
     */
    providerName: string;

    /**
     * provider item ids
     */
    providerItemIds: Array<string>;

  }): Observable<Items> {

    return this.getItems$Response(params).pipe(
      map((r: StrictHttpResponse<Items>) => r.body as Items)
    );
  }

  /**
   * Path part for operation getItemsByPage
   */
  static readonly GetItemsByPagePath = '/items/page/{providerName}';

  /**
   * a list of item from a provider by page.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemsByPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemsByPage$Response(params: {

    /**
     * provider name of the item
     */
    providerName: string;

    /**
     * the item field to sort
     */
    sortedField: string;

    /**
     * the item field to sort
     */
    sortedDesc: boolean;

    /**
     * required data page
     */
    pageNum: number;

    /**
     * required number of items per page
     */
    itemsPerPage: number;

  }): Observable<StrictHttpResponse<ItemsPage>> {

    const rb = new RequestBuilder(this.rootUrl, ItemsService.GetItemsByPagePath, 'get');
    if (params) {

      rb.path('providerName', params.providerName, {});
      rb.query('sortedField', params.sortedField, {});
      rb.query('sortedDesc', params.sortedDesc, {});
      rb.query('pageNum', params.pageNum, {});
      rb.query('itemsPerPage', params.itemsPerPage, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ItemsPage>;
      })
    );
  }

  /**
   * a list of item from a provider by page.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getItemsByPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemsByPage(params: {

    /**
     * provider name of the item
     */
    providerName: string;

    /**
     * the item field to sort
     */
    sortedField: string;

    /**
     * the item field to sort
     */
    sortedDesc: boolean;

    /**
     * required data page
     */
    pageNum: number;

    /**
     * required number of items per page
     */
    itemsPerPage: number;

  }): Observable<ItemsPage> {

    return this.getItemsByPage$Response(params).pipe(
      map((r: StrictHttpResponse<ItemsPage>) => r.body as ItemsPage)
    );
  }

  /**
   * Path part for operation getItemsSearchByPage
   */
  static readonly GetItemsSearchByPagePath = '/items/search';

  /**
   * items search.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemsSearchByPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemsSearchByPage$Response(params: {

    /**
     * the search word for items
     */
    searchWords: string;

    /**
     * required data page
     */
    maxItems: number;

    /**
     * required data page
     */
    pageNum: number;

    /**
     * required number of items per page
     */
    itemsPerPage: number;

  }): Observable<StrictHttpResponse<ItemsPage>> {

    const rb = new RequestBuilder(this.rootUrl, ItemsService.GetItemsSearchByPagePath, 'get');
    if (params) {

      rb.query('searchWords', params.searchWords, {});
      rb.query('maxItems', params.maxItems, {});
      rb.query('pageNum', params.pageNum, {});
      rb.query('itemsPerPage', params.itemsPerPage, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ItemsPage>;
      })
    );
  }

  /**
   * items search.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getItemsSearchByPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemsSearchByPage(params: {

    /**
     * the search word for items
     */
    searchWords: string;

    /**
     * required data page
     */
    maxItems: number;

    /**
     * required data page
     */
    pageNum: number;

    /**
     * required number of items per page
     */
    itemsPerPage: number;

  }): Observable<ItemsPage> {

    return this.getItemsSearchByPage$Response(params).pipe(
      map((r: StrictHttpResponse<ItemsPage>) => r.body as ItemsPage)
    );
  }

}
