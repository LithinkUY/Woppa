import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
 
import { IonicModule } from '@ionic/angular';
 
import { OptionsPage } from './menuoptions.page';
import { FavoriteProductsPageModule } from '../woppa/favorite-products/favorite-products.module';
import { ProductPortfolioPageModule } from '../woppa/product-portfolio/product-portfolio.module';
import { ServiceProvidersPage } from '../woppa/service-providers/service-providers.page';
import { ServiceProvidersPageModule } from '../woppa/service-providers/service-providers.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: OptionsPage,
    children: [
      {
        path: 'main',
        loadChildren: '../main/principal.module#principalPageModule'
      },
      {
        path: 'main/details',
        loadChildren: '../details/details.module#DetailsPageModule'
      },
      {
        path: 'config',
        loadChildren: '../config/conf.module#confPageModule'
      },
      { 
        path: 'product-portfolio', 
        loadChildren: '../woppa/product-portfolio/product-portfolio.module#ProductPortfolioPageModule'
      }
 


    ]
  },
  {
    path: '',
    redirectTo: 'tabs/main',
    pathMatch: 'full'
  }
];
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FavoriteProductsPageModule,
    ProductPortfolioPageModule,
    ServiceProvidersPageModule
    
  ],
  declarations: [OptionsPage]
})
export class OptionsPageModule {}
