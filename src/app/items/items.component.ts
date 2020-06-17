import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { ItemsService, SearchService } from '../api/services';
import { Item, ItemsPage } from '../api/models';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  rowsForm = new FormControl(10);
  rowsOptions = [10, 30, 50, 100];

  wrappedItems: ItemWrapper[] = [];
  providerName: string = 'eBay';
  sortedField: string = 'title';
  sortedDesc: boolean = false;
  pageNum: number;
  totalCount: number;
  itemsPerPage: number = 10;
  totalPages: number;
  searchOn: boolean = false;
  searchWords: string;

  constructor(private itemsService: ItemsService, private searchService: SearchService, private domSanitizer: DomSanitizer,
    private route: ActivatedRoute, ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.providerName = params['providerName'] == undefined ? this.providerName : params['providerName'];
      this.sortedField = params['sortedField'] == undefined ? this.sortedField : params['sortedField'];
      this.sortedDesc = params['sortedDesc'] == undefined ? this.sortedDesc : params['sortedDesc'];
      this.pageNum = params['pageNum'] == undefined ? this.pageNum : params['pageNum'];
      this.itemsPerPage = params['itemsPerPage'] == undefined ? this.itemsPerPage : params['itemsPerPage'];
    });
    this.pageNum = this.pageNum ? this.pageNum : 1;
    this.getItems(this.providerName, this.sortedField, this.sortedDesc, this.pageNum, this.itemsPerPage);

  }

  getItems(_providerName: string, _sortedField: string, _sortedDesc: boolean, _pageNum: number, _itemsPerPage: number): void {
    this.itemsService.getItemsByPage({ providerName: _providerName, sortedField: _sortedField, sortedDesc: _sortedDesc, pageNum: _pageNum, itemsPerPage: _itemsPerPage })
      .subscribe(result => this.processResult(result));
  }

  searchItems(_searchWords: string, _maxItems: number, _pageNum: number, _itemsPerPage: number): void {
    this.searchService.getItemsSearchByPage({ searchWords: _searchWords, maxItems: _maxItems, pageNum: _pageNum, itemsPerPage: _itemsPerPage
    }).subscribe(result => this.processResult(result));
  }

  processResult(result: ItemsPage) {
    this.wrappedItems.length = 0;
    result.items.forEach(item => {
      let itemWrapper = new ItemWrapper();
      itemWrapper.item = item;
      itemWrapper.safeImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + item.image64BaseStr);
      this.wrappedItems.push(itemWrapper);
    });
    this.totalCount = result.totalCount;
    this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage);
  }

  onSort(sort: any) { }

  onPagingClick(value: number) {
    console.log('clicked: ' + value);
    if (value >= 0 && value < this.totalPages) {
      this.pageNum = value;
      if(this.searchOn) {
        this.searchItems(this.searchWords, 200, this.pageNum, this.itemsPerPage);
      } else {
        this.getItems(this.providerName, this.sortedField, this.sortedDesc, this.pageNum, this.itemsPerPage);
      }
    }
  }

  counter() {
    return new Array(this.totalPages);
  }

  onSearch(value: string) {
    console.log("search words: " + value)
    if(value.length>2) {
      this.searchOn = true;
      this.searchWords = value;
      this.pageNum = 0;
      this.searchItems(this.searchWords, 200, this.pageNum, this.itemsPerPage);
    } else {
      this.searchOn = false;
    }
    if(value.length==0) {
      this.pageNum = 0;
      this.getItems(this.providerName, this.sortedField, this.sortedDesc, this.pageNum, this.itemsPerPage);
    }
  }

  onRowNumberChange(value: number) {
    this.itemsPerPage = value;
    this.pageNum = 0;
    this.getItems(this.providerName, this.sortedField, this.sortedDesc, this.pageNum, this.itemsPerPage);
  }
}

class ItemWrapper { item: Item; safeImage: SafeResourceUrl }
