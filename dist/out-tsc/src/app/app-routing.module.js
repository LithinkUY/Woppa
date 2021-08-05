import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'loading', pathMatch: 'full' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
    { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
    { path: 'config', loadChildren: './pages/menuconfig/menuconfig.module#MenuconfigModule' },
    { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
    { path: 'recuperasenha', loadChildren: './pages/recuperasenha/recuperasenha.module#RecuperasenhaPageModule' },
    { path: 'devices', loadChildren: './pages/devices/devices.module#DevicesPageModule' },
    { path: 'splash', loadChildren: './pages/splash/splash.module#SplashPageModule' },
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
    { path: 'produtos', loadChildren: './pages/produtos/produtos.module#ProdutosPageModule' },
    { path: 'menuopera', loadChildren: './pages/menuopera/menuopera.module#MenuoperaPageModule' },
    { path: 'fialiados', loadChildren: './pages/cadastros/fialiados/fialiados.module#FialiadosPageModule' },
    { path: 'developing', loadChildren: './pages/developing/developing.module#DevelopingPageModule' },
    // { path: 'options', loadChildren: '../menuoptions/menuoptions.module#OptionsPageModule' },
    { path: 'loading', loadChildren: './pages/loading/loading.module#LoadingPageModule' },
    { path: 'player', loadChildren: './pages/player/player.module#PlayerPageModule' },
    { path: 'reader', loadChildren: './pages/reader/reader.module#ReaderPageModule' },
    { path: 'player', loadChildren: './pages/player/player.module#PlayerPageModule' },
    { path: 'filemanager', loadChildren: './pages/filemanager/filemanager.module#FilemanagerPageModule' },
    { path: 'videoaula', loadChildren: './pages/videoaula/videoaula.module#VideoaulaPageModule' },
    { path: 'menumidias', loadChildren: './pages/menumidias/menumidias.module#MenumidiasPageModule' },
    { path: 'filmes', loadChildren: './pages/multimedias/filmes/filmes.module#FilmesPageModule' },
    { path: 'livros', loadChildren: './pages/multimedias/livros/livros.module#LivrosPageModule' },
    { path: 'unidades', loadChildren: './pages/adm/cadastros/unidades/unidades.module#UnidadesPageModule' },
    { path: 'contatos', loadChildren: './pages/adm/cadastros/contatos/contatos.module#ContatosPageModule' },
    { path: 'editoras', loadChildren: './pages/adm/cadastros/editoras/editoras.module#EditorasPageModule' },
    { path: 'cursos', loadChildren: './pages/adm/cadastros/cursos/cursos.module#CursosPageModule' },
    { path: 'cursostipos', loadChildren: './pages/adm/cadastros/cursostipos/cursostipos.module#CursostiposPageModule' },
    { path: 'devices', loadChildren: './pages/seg/cadastros/devices/devices.module#DevicesPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map