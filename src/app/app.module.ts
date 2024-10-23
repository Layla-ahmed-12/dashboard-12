import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './navbar/dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AudienceComponent } from './navbar/audience/audience.component';
import { GridComponent } from './navbar/grid/grid.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GridsterModule } from 'angular-gridster2';
import { FormsModule } from '@angular/forms';
import { ChartsComponent } from './charts/charts.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    AudienceComponent,
    GridComponent,
    ChartsComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    GridsterModule,
    FormsModule,
    HighchartsChartModule,
    jqxGridModule,
    jqxButtonModule,
    jqxInputModule,
    jqxWindowModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [jqxGridComponent,jqxWindowComponent,jqxInputComponent]
})
export class AppModule {
 }
 