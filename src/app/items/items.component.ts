import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ItemsService } from '../api/services';
import { Items } from '../api/models/items';
import { Item } from '../api/models';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
    
  wrappedItems: ItemWrapper[] = [];
  providerName: string = 'eBay';
  sortedField: string = 'title';
  sortedDesc: boolean = false;
  pageNum: number;
  totalCount: number;
  itemsPerPage: number = 10;
  totalPages: number;

  constructor(public itemsService: ItemsService, private domSanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router, private ngZone: NgZone, private cdr: ChangeDetectorRef,) { 
    } 

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.providerName = params['providerName']==undefined?this.providerName:params['providerName'];
      this.sortedField = params['sortedField']==undefined?this.sortedField:params['sortedField'];
      this.sortedDesc = params['sortedDesc']==undefined?this.sortedDesc:params['sortedDesc'];
      this.pageNum = params['pageNum']==undefined?this.pageNum:params['pageNum'];
      this.itemsPerPage = params['itemsPerPage']==undefined?this.itemsPerPage:params['itemsPerPage'];
    });   
    this.pageNum = this.pageNum? this.pageNum: 1;
    this.getItems(this.providerName, this.sortedField, this.sortedDesc, this.pageNum, this.itemsPerPage);

  }

  getItems(_providerName: string, _sortedField: string, _sortedDesc: boolean, _pageNum: number, _itemsPerPage: number): void {
    this.itemsService.getItemsByPage({ providerName: _providerName, sortedField: _sortedField, sortedDesc: _sortedDesc, pageNum: _pageNum, itemsPerPage: _itemsPerPage })
      .subscribe(result => { 
        this.wrappedItems.length = 0;
        result.items.forEach(item => {        
        let itemWrapper = new ItemWrapper(); 
        itemWrapper.item = item;
        itemWrapper.safeImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + item.image64BaseStr);
        this.wrappedItems.push(itemWrapper);
        this.wrappedItems = this.wrappedItems.slice();       
      });  
      this.totalCount = result.totalCount;
      this.totalPages = Math.ceil(this.totalCount/this.itemsPerPage);
    });
 //   this.cdr.markForCheck();  
  }

  onSort(sort: any) {}

  onPagingClick(value: number) { 
    console.log('clicked: ' + value);
    this.pageNum = value;
    this.getItems(this.providerName, this.sortedField, this.sortedDesc, this.pageNum, this.itemsPerPage);
    
  } 

  counter() {
    return new Array(this.totalPages);    
  }
}

class ItemWrapper { item: Item; safeImage: SafeResourceUrl }
