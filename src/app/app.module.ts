import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { HomeComponent } from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EstatisticasComponent } from './estatisticas/estatisticas.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'consulta', component: ConsultaComponent },
  { path: 'home', component: HomeComponent},
  { path: 'estatisticas', component: EstatisticasComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    HomeComponent,
    EstatisticasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ChartsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
