import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { SetsComponent } from './components/sets.component';
import { CardsComponent } from './components/cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CardsService } from './service/cards.service';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { CreateComponent } from './components/create.component';
import { MarketComponent } from './components/market.component';
import { CheckoutComponent } from './components/checkout.component';
import { HeaderComponent } from './components/header.component';
import { AlertModule } from '@full-fledged/alerts';
import { AddComponent } from './components/add.component';
import { CollectionComponent } from './components/collection.component';
import { UsersharingService } from './service/usersharing.service';
import { LogoutComponent } from './components/logout.component';
import { AcceptofferComponent } from './components/acceptoffer.component';
import { ForgetpassComponent } from './components/forgetpass.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SetsComponent,
    CardsComponent,
    MainComponent,
    CreateComponent,
    MarketComponent,
    CheckoutComponent,
    HeaderComponent,
    AddComponent,
    CollectionComponent,
    LogoutComponent,
    AcceptofferComponent,
    ForgetpassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right'}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [CardsService,UserService,UsersharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
