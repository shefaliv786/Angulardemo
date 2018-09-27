import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable()
export class StockUpdateService{
    stockList: AngularFireList<any>;
    
    constructor(private firebase: AngularFireDatabase){}

    getData(){
        this.stockList = this.firebase.list('stockDataSet');
        return this.stockList;
    }

    insertData(data){
        if(data){
            data.forEach(element => {
                this.stockList.push(element);
            });
        } 
    }
    updateData(data){
        this.stockList.update(data.$key,{
            close: data.close,
            totalShares: data.totalShares
        });
    }

    getDataByKey(key, stockData){
        let filteredDataForSelectedStock = stockData.filter(data=>{return data.$key===key});
    }
}