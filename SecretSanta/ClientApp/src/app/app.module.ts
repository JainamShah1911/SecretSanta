import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';

//components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InformationComponent } from './components/information/information.component';
import { DrawComponent } from './components/draw/draw.component';

//service
import { LoadingSpinnerService } from './components/loading-spinner/loading-spinner.service'
import { HomeService } from './components/home/home.service'
import { DrawService } from './components/draw/draw.service';


//directive, module
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    DashboardComponent,
    InformationComponent,
    DrawComponent
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    MatInputModule,
    MatTableModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoadingSpinnerService,
    HomeService,
    DrawService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
