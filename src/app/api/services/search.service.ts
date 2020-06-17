/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ItemsPage } from '../models/items-page';

@Injectable({
  providedIn: 'root',
})
export class SearchService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
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

    const rb = new RequestBuilder(this.rootUrl, SearchService.GetItemsSearchByPagePath, 'get');
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
