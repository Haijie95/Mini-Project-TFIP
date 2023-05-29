import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetsComponent } from './components/sets.component';
import { MainComponent } from './components/main.component';
import { CardsComponent } from './components/cards.component';
import { CreateComponent } from './components/create.component';
import { LoginComponent } from './components/login.component';
import { HeaderComponent } from './components/header.component';
import { MarketComponent } from './components/market.component';
import { CollectionComponent } from './components/collection.component';
import { AddComponent } from './components/add.component';
import { LogoutComponent } from './components/logout.component';
import { AcceptofferComponent } from './components/acceptoffer.component';
import { ForgetpassComponent } from './components/forgetpass.component';


const routes: Routes = [
  {path: '', component:MainComponent},
  {path:'api/getAllSets', component:SetsComponent},
  {path:'api/getSetCards/:setCode',component:CardsComponent},
  {path:'api/login',component:LoginComponent},
  {path:'api/logout',component:LogoutComponent},
  {path:'api/createUser',component:CreateComponent},
  {path:'api/addcard',component:AddComponent},
  {path:'api/market',component:MarketComponent},
  {path:'api/forgetpassword',component:ForgetpassComponent},
  {path:'api/acceptoffer/:details',component:AcceptofferComponent},
  {path:'api/personalcollection/:email',component:CollectionComponent},
  {path: '', component:HeaderComponent, outlet: 'header' },
  {path:'**', redirectTo: '',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
