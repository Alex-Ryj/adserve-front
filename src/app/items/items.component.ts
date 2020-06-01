import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../api/services';
import { Observable } from 'rxjs';
import { Items } from '../api/models/items';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  result: Items;
  image: SafeResourceUrl;
  constructor(public itemsService: ItemsService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemsService.getItemsByPage({providerName: 'eBay', sortedField: 'title', sortedDesc: false, pageNum: 1, itemsPerPage: 10})
    .subscribe(result =>  {
      result.forEach(item => {this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + item.image64BaseStr);
      });
      this.result = result });
  }
  
}
