/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getItem
   */
  static readonly GetItemPath = '/items/provider/{providerName}/{providerItemId}';

  /**
   * an item from the provider.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItem()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItem$Response(params: {

    /**
     * provider name of the item
     */
    providerName: string;

    /**
     * provider item id
     */
    providerItemId: string;

  }): Observable<StrictHttpResponse<Item>> {

    const rb = new RequestBuilder(this.rootUrl, ItemService.GetItemPath, 'get');
    if (params) {

      rb.path('providerName', params.providerName, {});
      rb.path('providerItemId', params.providerItemId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Item>;
      })
    );
  }

  /**
   * an item from the provider.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getItem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItem(params: {

    /**
     * provider name of the item
     */
    providerName: string;

    /**
     * provider item id
     */
    providerItemId: string;

  }): Observable<Item> {

    return this.getItem$Response(params).pipe(
      map((r: StrictHttpResponse<Item>) => r.body as Item)
    );
  }

}
