/* tslint:disable */
export interface Item {
  condition?: string;
  country?: string;
  createdOn?: string;
  currency?: string;
  deleted?: boolean;
  description?: string;
  galleryURL?: string;
  id?: string;
  image64BaseStr?: string;
  location?: string;
  modifiedImage64BaseStr?: string;
  price?: number;
  priceFormatted?: string;
  process?: boolean;
  productId?: string;
  providerItemId: string;
  providerName: string;
  rank?: number;
  relevance?: number;
  source?: string;
  subTitles?: Array<string>;
  title: string;
  updatedOn?: string;
  viewItemURL: string;
}
