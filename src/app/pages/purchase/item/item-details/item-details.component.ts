import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../../@service/purchase/item/item.service';

@Component({
  selector: 'ngx-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  source: any = [];
  settings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      itemcode: {
        title: 'itemcode',
        type: 'string',
      },
      itemDescription: {
        title: 'Item Description',
        type: 'string',
      },
      station: {
        title: 'Item No',
        type: 'string',
      },
    },
  };

  constructor(private post: ItemService) { }

  ngOnInit(): void {
    this.post.ViewItem().subscribe(data => {
      this.source = data.Data;
    });
  }

}
