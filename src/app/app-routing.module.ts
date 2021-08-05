import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'loading', pathMatch: 'full' },
  { path: 'loading', loadChildren: './pages/loading/loading.module#LoadingPageModule' },  
  { path: 'login',      loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'menu',       loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'config', loadChildren: './pages/menuconfig/menuconfig.module#MenuconfigModule' },  
  { path: 'splash',     loadChildren: './pages/splash/splash.module#SplashPageModule' },    
  { path: 'menusadm', loadChildren: './pages/menusadm/menusadm.module#MenusadmPageModule' },
  { path: 'menuadm', loadChildren: './pages/menuadm/menuadm.module#MenuadmPageModule' },
  { path: 'menufin', loadChildren: './pages/menufin/menufin.module#MenufinPageModule' },
  { path: 'menuger', loadChildren: './pages/menuger/menuger.module#MenugerPageModule' },
  { path: 'menucad', loadChildren: './pages/menucad/menucad.module#MenucadPageModule' },
  { path: 'menurel', loadChildren: './pages/menurel/menurel.module#MenurelPageModule' },
  { path: 'menuseg', loadChildren: './pages/menuseg/menuseg.module#MenusegPageModule' },
  { path: 'menuestoq', loadChildren: './pages/menuestoq/menuestoq.module#MenuestoqPageModule' },
  { path: 'menupatrim', loadChildren: './pages/menupatrim/menupatrim.module#MenupatrimPageModule' },
  { path: 'menurh', loadChildren: './pages/menurh/menurh.module#MenurhPageModule' },
  { path: 'menuprod', loadChildren: './pages/menuprod/menuprod.module#MenuprodPageModule' },  
  { path: 'menuopera', loadChildren: './pages/menuopera/menuopera.module#MenuoperaPageModule' },  
  { path: 'menumidias', loadChildren: './pages/menumidias/menumidias.module#MenumidiasPageModule' },
  { path: 'devices',    loadChildren: './pages/devices/devices.module#DevicesPageModule' },
  //{ path: 'identidade-digital', loadChildren: './pages/seg/identidade-digital/identidade-digital.module#IdentidadeDigitalPageModule' },    
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'accessoptions', loadChildren: './pages/accessoptions/accessoptions.module#AccessoptionsPageModule' },
  { path: 'delivery', loadChildren: './pages/woppa/delivery/delivery.module#DeliveryPageModule' },
  { path: 'expired-offer', loadChildren: './pages/woppa/expired-offer/expired-offer.module#ExpiredOfferPageModule' },
  { path: 'user-offer', loadChildren: './pages/woppa/user-offer/user-offer.module#UserOfferPageModule' },
  { path: 'took-offer', loadChildren: './pages/woppa/took-offer/took-offer.module#TookOfferPageModule' },
  { path: 'service-providers', loadChildren: './pages/woppa/service-providers/service-providers.module#ServiceProvidersPageModule' },
  { path: 'favorite-products', loadChildren: './pages/woppa/favorite-products/favorite-products.module#FavoriteProductsPageModule' },
 // { path: 'product-portfolio', loadChildren: './pages/woppa/product-portfolio/product-portfolio.module#ProductPortfolioPageModule' },
  { path: 'unlock-offer', loadChildren: './pages/woppa/unlock-offer/unlock-offer.module#UnlockOfferPageModule' },
  { path: 'supplier-products', loadChildren: './pages/woppa/supplier-products/supplier-products.module#SupplierProductsPageModule' },
  { path: 'take-offer', loadChildren: './pages/woppa/take-offer/take-offer.module#TakeOfferPageModule' },
  { path: 'choose-offer', loadChildren: './pages/woppa/choose-offer/choose-offer.module#ChooseOfferPageModule' },
  // { path: 'saveapprox', loadChildren: './pages/woppa/saveapprox/saveapprox.module#SaveapproxPageModule' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
