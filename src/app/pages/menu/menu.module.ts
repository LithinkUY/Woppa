import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
// import { Clipboard } from '@ionic-native/clipboard';
import { environment } from './../../../environments/environment.prod';
const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      // Ambiente | Arquitetura | Rotas | Menu
      //---------------      
      { path: 'options', loadChildren: '../menuoptions/menuoptions.module#OptionsPageModule' },      
      { path: 'config', loadChildren: '../menuconfig/menuconfig.module#MenuconfigModule' },            
      { path: 'menuger', loadChildren: '../menuger/menuger.module#MenugerPageModule' },
      { path: 'menucad', loadChildren: '../menucad/menucad.module#MenucadPageModule' },
      { path: 'menurel', loadChildren: '../menurel/menurel.module#MenurelPageModule' },
      { path: 'menufin', loadChildren: '../menufin/menufin.module#MenufinPageModule' },      
      { path: 'menuestoq', loadChildren: '../menuestoq/menuestoq.module#MenuestoqPageModule' },
      { path: 'menupatrim', loadChildren: '../menupatrim/menupatrim.module#MenupatrimPageModule' },
      { path: 'menurh', loadChildren: '../menurh/menurh.module#MenurhPageModule' },
      { path: 'menuprod', loadChildren: '../menuprod/menuprod.module#MenuprodPageModule' },
      { path: 'menuopera', loadChildren: '../menuopera/menuopera.module#MenuoperaPageModule' },
      

      // Dashboard | Home | Menu Principal
      //-----------------------------------------------
      { path: 'faleconosco', loadChildren: '../faleconosco/faleconosco.module#FaleconoscoPageModule' },      
      { path: 'noticias', loadChildren: '../noticias/noticias.module#NoticiasPageModule' },
      { path: 'form-update-users', loadChildren: '../forms/lead/form-update-users/form-update-users.module#FormUpdateUsersPageModule'}, 

      // Configurações | Segurança | Controle de Usuário
      //-----------------------------------------------      
      { path: 'menuseg', loadChildren: '../menuseg/menuseg.module#MenusegPageModule' },
      
      { path: 'minhaconta', loadChildren: '../seg/minhaconta/minhaconta.module#MinhacontaPageModule' },
      { path: 'usuarios', loadChildren: '../seg/usuarios/usuarios.module#UsuariosPageModule' },
      { path: 'perfis', loadChildren: '../seg/perfis/perfis.module#PerfisPageModule' },
      { path: 'permissoes', loadChildren: '../seg/permissoes/permissoes.module#PermissoesPageModule' },
      { path: 'perfis-por-usuario', loadChildren: '../seg/perfisusuario/perfisusuario.module#PerfisusuarioPageModule' },      
      { path: 'devices', loadChildren: '../seg/devices/devices.module#DevicesPageModule' },
      { path: 'pessoas', loadChildren: '../seg/pessoas/pessoas.module#PessoasPageModule' },
      { path: 'developing', loadChildren: '../seg/developing/developing.module#DevelopingPageModule' },
      
      // AgilFlix - Plartaforma de Conteúdo / Multimédia
      //------------------------------------------------
      
      { path: 'menumidias', loadChildren: '../menumidias/menumidias.module#MenumidiasPageModule' },
      /*
      { path: 'cursos', loadChildren: '../agilflix/cursos/cursos.module#CursosPageModule' },
      { path: 'cursostipos', loadChildren: '../agilflix/cursostipos/cursostipos.module#CursostiposPageModule' },            
      { path: 'disciplinas', loadChildren: '../agilflix/disciplinas/disciplinas.module#DisciplinasPageModule' },
      { path: 'editoras', loadChildren: '../agilflix/editoras/editoras.module#EditorasPageModule' },
      { path: 'filmes', loadChildren: '../agilflix/filmes/filmes.module#FilmesPageModule' },
      { path: 'filemanager', loadChildren: '../agilflix/filemanager/filemanager.module#FilemanagerPageModule' },      
      { path: 'livros', loadChildren: '../agilflix/livros/livros.module#LivrosPageModule' },
      { path: 'player', loadChildren: '../agilflix/player/player.module#PlayerPageModule' },      
      { path: 'videoaula', loadChildren: '../agilflix/videoaula/videoaula.module#VideoaulaPageModule' },      
      */
      // Jurídico / Módulos de ERP
      //-----------------------------------------------    
      { path: 'acoesjudiciais', loadChildren: '../juri/acoesjudiciais/acoesjudiciais.module#AcoesjudiciaisPageModule' },
      { path: 'minhaacoes', loadChildren: '../juri/minhaacoes/minhaacoes.module#MinhaacoesPageModule' },

      // Administrativo / Módulos de ERP
      //-----------------------------------------------   
      
      { path: 'menuadm', loadChildren: '../menuadm/menuadm.module#MenuadmPageModule' },        
      
      { path: 'menusadm', loadChildren: '../menusadm/menusadm.module#MenusadmPageModule'},      
      { path: 'grupos', loadChildren: '../adm/grupos/grupos.module#GruposPageModule' },      
      { path: 'segmentos', loadChildren: '../adm/segmentos/segmentos.module#SegmentosPageModule' },            
      { path: 'unidades', loadChildren: '../adm/unidades/unidades.module#UnidadesPageModule' },
      { path: 'contatos', loadChildren: '../adm/contatos/contatos.module#ContatosPageModule' },      
     // { path: 'fornecedores', loadChildren: '../adm/fornecedores/fornecedores.module#FornecedoresPageModule' },
      { path: 'produtos', loadChildren: '../adm/produtos/produtos.module#ProdutosPageModule' },                  
      { path: 'notifications', loadChildren: '../adm/notifications/notifications.module#NotificationsPageModule' },     
     
      // Módulos de WOPPA
      //-----------------------------------------------   
      { path: 'delivery', loadChildren: '../woppa/delivery/delivery.module#DeliveryPageModule' },
      { path: 'expired-offer', loadChildren: '../woppa/expired-offer/expired-offer.module#ExpiredOfferPageModule' },
      { path: 'user-offer', loadChildren: '../woppa/user-offer/user-offer.module#UserOfferPageModule' },
      { path: 'took-offer', loadChildren: '../woppa/took-offer/took-offer.module#TookOfferPageModule' },
      { path: 'service-providers', loadChildren: '../woppa/service-providers/service-providers.module#ServiceProvidersPageModule' },
      { path: 'favorite-products', loadChildren: '../woppa/favorite-products/favorite-products.module#FavoriteProductsPageModule' },
      { path: 'product-portfolio', loadChildren: '../woppa/product-portfolio/product-portfolio.module#ProductPortfolioPageModule' },
      { path: 'unlock-offer', loadChildren: '../woppa/unlock-offer/unlock-offer.module#UnlockOfferPageModule' },
      { path: 'supplier-products', loadChildren: '../woppa/supplier-products/supplier-products.module#SupplierProductsPageModule' },
      { path: 'take-offer', loadChildren: '../woppa/take-offer/take-offer.module#TakeOfferPageModule' },
      { path: 'choose-offer', loadChildren: '../woppa/choose-offer/choose-offer.module#ChooseOfferPageModule' }
    

      /*
      { path: 'service-providers', loadChildren: './service-providers/service-providers.module#ServiceProvidersPageModule' },
      { path: 'favorite-products', loadChildren: './favorite-products/favorite-products.module#FavoriteProductsPageModule' },
      { path: 'product-portfolio', loadChildren: './product-portfolio/product-portfolio.module#ProductPortfolioPageModule' }
       */

    ]

  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
    // [Clipboard]

  ],
  declarations: [MenuPage]
})
export class MenuPageModule {

}
