import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { HomeComponent } from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'consulta', component: ConsultaComponent },
  { path: 'home', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
