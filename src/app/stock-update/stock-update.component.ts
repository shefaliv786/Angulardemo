import { Component,OnInit,ViewChild } from '@angular/core';
import { Chart } from 'chart.js/src/chart.js';
import { ChartComponent } from 'angular2-chartjs';
import { StockUpdateService } from './stock-update.service';
import { element } from '@angular/core/src/render3/instructions';
import { Stock } from 'src/app/model';

@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.css'],
  providers: [StockUpdateService]
})
export class StockUpdateComponent  implements OnInit{
  stockList :Set<any>;
  data: any;
  options: any;
  themeSubscription: any;
  selectedStockName:string;
  stockListForDisplay:Array<any>=[];
  isDisplay:boolean;
  stockData:Array<Stock>=[];
  labels: Array<any>[];
  selectedStock: Object;
  
  stockDataSet=[
    {'key':null,'stock' : 'INFY','open' : 93.15,'close' : 100,'high' : 102.5,'low': 93.15,'totalShares' : 1200, 'date':"31/08/2018" },
    {'key':null, 'stock' : 'INFY','open' : 93.15,'close' : 150,'high' : 102.5,'low': 93.15,'totalShares' : 1400, 'date':"1/09/2018" },
    {'key':null, 'stock' : 'REL','open' : 93.15,'close' : 90,'high' : 102.5,'low': 93.15,'totalShares' : 800, 'date':"2/09/2018" },
    {'key':null, 'stock' : 'REL','open' : 93.15,'close' : 250,'high' : 102.5,'low': 93.15,'totalShares' : 1000, 'date':"1/09/2018" },
   ];
  
  @ViewChild(ChartComponent) stockChart: ChartComponent;
  constructor(private stockUpdateService: StockUpdateService) {}

 ngOnInit(){

  modalData: Stock;   
   let x = this.stockUpdateService.getData();
   x.snapshotChanges().subscribe(item =>{
     item.forEach(element =>{
       let y = element.payload.toJSON();
       y["$key"] = element.key;
       this.stockData.push(y as Stock);
       })
   });

    this.selectedStockName='selected Stock';
    let stockNameList = [];
    for(let keys of this.stockData){
      stockNameList.push(keys['stock']);
    }
    let finalStockList = new Set(stockNameList);
    this.stockData.forEach(ele=> {
      this.labels.push(ele.date);
    })
    this.data = {
      datasets: [{
        label: 'stock close price',
        borderColor: 'red',
      }, {
        
        label: 'number of shares traded',
        borderColor: 'blue',
      }
      ],
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              color: 'green',
            },
            ticks: {
              fontColor: 'green',
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
              color: 'blue',
            },
            ticks: {
              fontColor: 'blue',
            },
          },
        ],
      },
      legend: {
        labels: {
          fontColor: 'blue',
        },
      },
    };
  
  }

  
  onToggle(stockName, stockKey){
  
    let filteredDataForSelectedStock=this.stockData.filter(data=>{return data.stock===stockName});
    let labels=filteredDataForSelectedStock.map(data=>data.date);
    let data_stockClosePrice=filteredDataForSelectedStock.map(data=>data.close);
    let data_sharesTraded=filteredDataForSelectedStock.map(data=>data.totalShares);
    this.data.labels=labels;
    this.data.datasets[0].data=data_stockClosePrice;
    this.data.datasets[1].data=data_sharesTraded;
    this.stockListForDisplay = filteredDataForSelectedStock;
    this.stockChart.chart.update();
  }
 
   edit(key){
     this.isDisplay = !this.isDisplay;
     let filteredDataForSelectedStock = this.stockData.filter(data=>{return data.$key === key});
     // filteredDataForSelectedStock will have only one seleceted stock
      this.selectedStock= filteredDataForSelectedStock[0];
     //let x = this.stockUpdateService.getDataByKey(this.stockData, key);
   }
   insert(){
    this.stockUpdateService.insertData(this.stockDataSet);
   }
}
