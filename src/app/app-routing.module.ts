import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/dashboard/home/home.component';
import { CityComponent } from './components/city-area/city/city.component';
import { CategoryComponent } from './components/category-area/category/category.component';
import { CarTransmissionComponent } from './components/car-transmission-area/carTransmission/carTransmission.component';
import { CarColorComponent } from './components/color-area/car-color/car-color.component';
import { CarEngineComponent } from './components/car-engin-area/car-engine/car-engine.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/dashboard/admin-panel/admin-panel.component';
import { authGuard } from './guards/auth.guard';
import { FurnishingComponent } from './components/furnishing-area/furnishing/furnishing.component';
import { MawaterStatusComponent } from './components/mawater-status-area/mawaterStatus/mawaterStatus.component';
import { MawaterTypeComponent } from './components/mawater-type-area/mawaterType/mawaterType.component';
import { YearComponent } from './components/year-area/year/year.component';
import { MawaterComponent } from './components/mawater/mawater/mawater.component';
import { WheelMovementComponent } from './components/wheel-movement-area/wheelMovement/wheelMovement.component';
import { PaymentPackageComponent } from './components/payment-package-area/paymentPackage/paymentPackage.component';
import { MawaterStructureComponent } from './components/mawater-structure-area/mawaterStructure/mawaterStructure.component';
import { PaymentFeatureDialogComponent } from './components/paymentFeature-area/paymentFeature/paymentFeature-dialog/paymentFeature-dialog.component';
import { PaymentFeatureComponent } from './components/paymentFeature-area/paymentFeature/paymentFeature.component';
import { BannerComponent } from './components/banner-area/banner/banner.component';
import { SettingsComponent } from './components/Settings/settings/settings.component';

const routes: Routes = [
  {path : 'login' , component:LoginComponent },
  {path : '' , component:LoginComponent},
  {
    path:'',
    runGuardsAndResolvers: 'always',
    canActivateChild : [authGuard],
    component : AdminPanelComponent,
    canActivate : [authGuard],
    children : [
      { path: 'dashboard/home', component: HomeComponent },
      { path: 'dashboard/city', component: CityComponent},
      { path: 'dashboard/category', component: CategoryComponent},
      { path: 'dashboard/transmission', component: CarTransmissionComponent},
      { path: 'dashboard/color', component: CarColorComponent },
      { path: 'dashboard/engineCapacity', component: CarEngineComponent},
      { path: 'dashboard/furnishing', component: FurnishingComponent},
      { path: 'dashboard/mawaterStatus', component: MawaterStatusComponent},
      { path: 'dashboard/mawaterStructure', component: MawaterStructureComponent},
      { path: 'dashboard/mawaterType', component: MawaterTypeComponent},
      { path: 'dashboard/mawater', component: MawaterComponent},
      { path: 'dashboard/year', component: YearComponent},
      { path: 'dashboard/wheelMovement', component: WheelMovementComponent},
      { path: 'dashboard/paymentPackage', component: PaymentPackageComponent},
      { path: 'dashboard/paymentFeature', component: PaymentFeatureComponent},
      { path: 'dashboard/banner', component: BannerComponent},
      { path: 'dashboard/settings', component: SettingsComponent},
      { path : '', pathMatch:'full' , redirectTo:'dashboard/home'},
      { path: '**', pathMatch:'full' , redirectTo:'dashboard/home'},
    ]
  },
  {path : '**' , component:LoginComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
