import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductPortfolioPage } from './product-portfolio.page';

const routes: Routes = [
  {
    path: '',
    component: ProductPortfolioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
    
  ],
  declarations: [ProductPortfolioPage]
})
export class ProductPortfolioPageModule {}
