import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { StockUpdateService } from 'src/app/stock-update/stock-update.service';

@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock-modal.component.html',
  styleUrls: ['./stock-modal.component.css']
})
export class StockModalComponent {

  @Input() isDisplay: boolean;
  @Input() selectedStock:Object;

  constructor(private stockUpdateService : StockUpdateService) { }
  
  onUpdate(){
    this.stockUpdateService.updateData(this.selectedStock);
  }

}
