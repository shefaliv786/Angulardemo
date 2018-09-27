import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxAdminLteModule } from 'ngx-admin-lte';
import { StockUpdateComponent } from './stock-update/stock-update.component';
import { ChartModule } from 'angular2-chartjs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from '../environments/environment';
import { NgxModalModule } from '@ngx-lite/modal';
import { StockModalComponent } from './stock-update/stock-modal/stock-modal.component';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { StockUpdateService } from 'src/app/stock-update/stock-update.service';

@NgModule({
  declarations: [
    AppComponent,
    StockUpdateComponent,
    StockModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxAdminLteModule,
    ChartModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgxModalModule
  ],
  providers: [StockUpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
