import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { VgStates } from 'videogular2/src/core/states/vg-states';
import { VgEvents } from 'videogular2/src/core/events/vg-events';
import { NavController, PopoverController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { Router } from '@angular/router';
import { Filmes } from 'src/app/models/filmes';
import { CursosFilmesComments } from 'src/app/models/cursosfilmescomments';
import { Platform } from '@ionic/angular';
var FilmesPage = /** @class */ (function () {
    function FilmesPage(ref, cdRef, navCtrl, alertService, Authorizer, env, popoverController, router, platform) {
        this.ref = ref;
        this.cdRef = cdRef;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.Authorizer = Authorizer;
        this.env = env;
        this.popoverController = popoverController;
        this.router = router;
        this.platform = platform;
        this.time = { current: 0, total: 0, left: 0 };
        this.buffer = { end: 0 };
        this.buffered = { length: 1, end: function (end) { return 0; } };
        this.canPlay = false;
        this.canPlayThrough = false;
        this.isMetadataLoaded = false;
        this.isWaiting = false;
        this.isFullscreen = false;
        this.isCompleted = false;
        this.isLive = false;
        this.state = VgStates.VG_PAUSED;
        this.FiveIcon = environment.logoCliente;
        this.subtitleVideo = environment.subtitle;
        this.videos = environment.videos;
        this.lgPlay = environment.lgplay;
        this.poster = environment.poster;
        this.preload = 'auto';
        this.AppName = environment.AppNameSigla;
        this.title = this.Authorizer.formTitle; // 'Cadastro Usuários';
        this.subtitle = "Autorar Filme"; //this.Authorizer.formSubTitle; // 'Usuário';
        this.iconAvatarUsuario = environment.iconAvatarUsuarioDefault;
        this.CodigoUsuarioSistema = this.Authorizer.CodigoUsuarioSistema;
        this.flagFiltroAvanzado = false;
        this.RowsPageDef = 100;
        this.PageNumber = 1;
        this.RowsPage = 5;
        this.Paginas = [];
        this.flagForm = false;
        this.flagFormPlay = false;
        this.DurationBegin = '000000';
        this.flagPlayCurrent = true;
        this.collection = [];
        this.model = new Filmes;
        this.modeli = new Filmes;
        this.modelPesquisa = new Filmes;
        this.modelCursosFilmesComments = new CursosFilmesComments;
        this.collectionCountFilmesComments = 0;
        this.ComentarioLength = 0;
        this.collectionCursoFilmecomments = [];
        this.collectionCurrentFilmecomments = [];
        this.collectionSegmentos = [{
                CodigoSegmento: '',
                Nome: ''
            }];
        this.permissoes = {
            Route: '',
            Ver: 0,
            Pesquisar: 0,
            Inserir: 0,
            Editar: 0,
            Deletar: 0,
            Responder: 0
        }; // Permissoes do modulo para o usuario logado
        this.compareWithFn = function (o1, o2) {
            return o1 === o2;
        };
        // vg-s1
        this.elem = ref.nativeElement;
        this.id = this.elem.id;
    }
    FilmesPage.prototype.ngOnInit = function () {
        // vg-s2
        // this.timer = TimerObservable.create(0, 10);
        this.getPermissoesModulo();
        this.read(1, this.RowsPageDef);
    };
    FilmesPage.prototype.onPlayerReady = function (api) {
        var _this = this;
        // console.log('VideoApi:',api);
        this.api = api;
        this.isFullscreen = api.fsAPI.isFullscreen;
        // this.api.volume = 0;
        // this.api.play();
        // this.toggleFullscreen =  api.fsAPI.onChangeFullscreen; 
        this.api.getDefaultMedia().subscriptions.ended.subscribe(function () {
            // Set the video to the beginning
            _this.api.getDefaultMedia().currentTime = 0;
        });
    };
    FilmesPage.prototype.onUpdateTime = function (currentTime, duration) {
        this.modelCursosFilmesComments.DurationEnd = currentTime;
    };
    FilmesPage.prototype.currentTimeAPI = function () {
        return this.api.time.current;
    };
    //------------------------------------------------
    // Eventos Angular
    //------------------------------------------------
    FilmesPage.prototype.ngAfterViewChecked = function () {
        // console.log("DetectChanges");
        this.cdRef.detectChanges();
        // if ( this.flagFormComment ) this.iComentario.setFocus();
    };
    FilmesPage.prototype.ngAfterContentInit = function () {
        // console.log(this.ngAfterContentInit);
    };
    FilmesPage.prototype.ngAfterContentChecked = function () {
        // console.log("Aconteceu....");    
    };
    FilmesPage.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['duration'].currentValue) {
            this.duration = changes['duration'].currentValue * 1000;
            this.time.total = this.duration;
            this.buffer.end = this.duration;
            this.buffered.end = function (end) { return _this.duration; };
            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_LOADED_METADATA));
            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY));
            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY_THROUGH));
        }
    };
    FilmesPage.prototype.isPortrait = function () {
        this.device = this.platform.platforms()[0];
        // this.alertService.presentToast(this.platform.platforms()[0]);
        if (this.platform.platforms()[0] === "android" ||
            // this.platform.platforms()[0] === "ipad" ||
            this.platform.platforms()[0] === "iphone") {
            if (this.flagFormPlay) {
                // return (window.innerHeight > window.innerWidth);  
                if (!this.platform.isPortrait()) {
                    // this.toggleFullscreen(event);
                }
                return this.platform.isPortrait();
            }
        }
        else {
            return true;
        }
    };
    /*
    ngAfterViewInit(): void {
      this.api.fsAPI.onChangeFullscreen.subscribe((event) => {
        this.toggleFullscreen(event);
      });
    }
    */
    FilmesPage.prototype.toggleFullscreen = function ($event) {
        console.log($event);
    };
    FilmesPage.prototype.setCurrentVideo = function (source, type) {
        this.api.pause();
        this.sources = new Array();
        this.sources.push({
            src: source,
            type: type
        });
        this.api.getDefaultMedia().currentTime = 0;
    };
    FilmesPage.prototype.trackSelect = function ($event) {
        console.log($event);
        //this.collectionCursoFilmecomments.DurationBegin = this.api.currentTime;
    };
    FilmesPage.prototype.play = function () {
        var _this = this;
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAY));
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAYING));
        this.timerSubs = this.timer.subscribe(function () {
            _this.currentTime += 10;
            _this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_TIME_UPDATE));
            if (_this.time.current >= _this.time.total) {
                _this.currentTime = 0;
                _this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_ENDED));
                _this.timerSubs.unsubscribe();
            }
        });
    };
    Object.defineProperty(FilmesPage.prototype, "currentTime", {
        get: function () {
            return this.time.current;
        },
        set: function (seconds) {
            this.time.current = seconds;
        },
        enumerable: true,
        configurable: true
    });
    FilmesPage.prototype.pause = function () {
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PAUSE));
        this.timerSubs.unsubscribe();
    };
    FilmesPage.prototype.onEnterCuePoint = function (e) {
        // console.log('EnterCuePoint:',e);
    };
    FilmesPage.prototype.onExitCuePoint = function (e) {
        // console.log('ExitCuePoint',e);
    };
    FilmesPage.prototype.getPermissoesModulo = function () {
        var _this = this;
        var permissaoModulo = this.Authorizer.permissoesUsuario.filter(function (item) {
            return (item.Route === _this.router.url);
        });
        if (permissaoModulo.length === 1) {
            this.permissoes = {
                Route: permissaoModulo[0].Route,
                Ver: permissaoModulo[0].Ver,
                Pesquisar: permissaoModulo[0].Pesquisar,
                Inserir: permissaoModulo[0].Inserir,
                Editar: permissaoModulo[0].Editar,
                Deletar: permissaoModulo[0].Deletar,
                Responder: permissaoModulo[0].Inserir
            };
        }
        else {
            console.log('Houve um problema nas permissoes do modulo: ', this.router.url);
        }
    };
    /**
     *
     * Data: 04/12/2019
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
    FilmesPage.prototype.sendRequest = function (procedure, params, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var paramsSend;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (typeof this.Authorizer.HashKey !== 'undefined') {
                    if (((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
                        || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
                        || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
                        || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
                        || ((params.StatusCRUD === 'QUERY') && (this.permissoes.Pesquisar > 0))
                    // || (procedure === 'spCursoFilmeComments')
                    /*
                    || (procedure === 'spSegmentos')
                    || (procedure === 'spCarregaGrupos')
                    */
                    ) {
                        paramsSend = {
                            StatusCRUD: params.StatusCRUD,
                            formValues: params.formValues,
                            CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
                            Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
                        };
                        this.Authorizer.QueryStoreProc('Executar', procedure, paramsSend).then(function (res) {
                            var resultado = res[0];
                            try {
                                if (resultado.success) {
                                    next(resultado);
                                    if (procedure === 'spMenusAdm') {
                                        _this.alertService.showLoader(resultado.message, 1000);
                                    }
                                }
                                else {
                                    _this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: _this.subtitle, pMessage: resultado.message });
                                    _this.navCtrl.back();
                                }
                            }
                            catch (err) {
                                _this.alertService.presentAlert({
                                    pTitle: environment.AppNameSigla,
                                    pSubtitle: _this.subtitle,
                                    pMessage: 'Erro ao fazer a petição'
                                });
                            }
                        });
                    }
                    else {
                        this.alertService.presentAlert({
                            pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
                        });
                    }
                }
                else {
                    this.goBack();
                }
                return [2 /*return*/];
            });
        });
    };
    FilmesPage.prototype.salvar = function (form) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                params = {
                    StatusCRUD: this.model.CodigoFilme > 0 ? 'UPDATE' : 'CREATE',
                    formValues: this.model,
                };
                this.sendRequest('spFilmes', params, function (resultado) {
                    if (params.StatusCRUD === 'CREATE') {
                        _this.collection.push(JSON.parse(atob(resultado.results))[0]);
                        _this.collectionFilter = _this.collection;
                    }
                    else if (params.StatusCRUD === 'UPDATE') {
                        _this.collectionFilter = _this.collection.map(function (item, index) {
                            if (item.CodigoFilme === _this.model.CodigoFilme) {
                                item = JSON.parse(atob(resultado.results))[0];
                            }
                            return item;
                        });
                        _this.collection = _this.collectionFilter;
                    }
                    // this.playForm(model);      
                    _this.flagForm = !(_this.flagForm);
                    _this.alertService.showLoader(resultado.message, 1000);
                });
                return [2 /*return*/];
            });
        });
    };
    FilmesPage.prototype.delete = function (model) {
        var _this = this;
        var alert = document.createElement('ion-alert');
        alert.header = 'Excluíndo!';
        alert.message = "<strong> " + model.Name + "</strong>!!!";
        alert.buttons = [
            {
                text: 'Desistir',
                role: 'cancel',
                cssClass: 'secondary',
                handler: function (blah) {
                    console.log('Confirm Cancel: blah');
                }
            }, {
                text: 'Confirmar',
                handler: function () {
                    var params = {
                        StatusCRUD: 'DELETE',
                        formValues: model
                    };
                    _this.sendRequest('spMenusAdm', params, function (resultado) {
                        _this.collection.forEach(function (model, index, collection) {
                            if (model.CodigoFilme === this) {
                                collection.splice(index, 1);
                            }
                        }, model.CodigoMorador);
                        _this.resetModel();
                    });
                }
            }
        ];
        document.body.appendChild(alert);
        return alert.present();
    };
    FilmesPage.prototype.readCursoFilmesComments = function (pCodigoCursoFilme) {
        var _this = this;
        // Obtendo a informação do banco de dados    
        var params = {
            StatusCRUD: 'READ',
            formValues: {
                CodigoCursoFilme: pCodigoCursoFilme
            }
        };
        this.loadMessage = 'Aguarde... carregando comentários...';
        this.sendRequest('spCursoFilmeComments', params, function (resultado) {
            _this.collectionCursoFilmecomments = JSON.parse(atob(resultado.results));
            _this.collectionFilterFilmesComments = _this.collectionCursoFilmecomments;
            _this.collectionCountFilmesComments = _this.collectionFilterFilmesComments.length;
            if (_this.collectionCountFilmesComments == 0) {
                _this.loadMessage = "Nenhum cometário foi feito para este video, seja você o primeiro a fazer-lo!";
            }
        });
    };
    FilmesPage.prototype.resetModelCursoFilmecomments = function () {
        // tslint:disable-next-line: forin
        for (var key in this.modelCursosFilmesComments) {
            this.modelCursosFilmesComments[key] = '';
        }
    };
    FilmesPage.prototype.salvarCursoFilmesComments = function (model) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                // Salvando a informação no banco de dados          
                this.modelCursosFilmesComments.CodigoCursoFilme = this.model.CodigoFilme;
                this.modelCursosFilmesComments.CodigoUsuarioSistemaComentou = this.Authorizer.CodigoUsuarioSistema;
                this.modelCursosFilmesComments.CodigoCursoFilmeCommentsFather = this.Authorizer.CodigoUsuarioSistema;
                this.modelCursosFilmesComments.CodigoUsuarioSistemaComentou = this.Authorizer.CodigoUsuarioSistema;
                this.modelCursosFilmesComments.CodigoUsuarioSistemaRespondeu = this.Authorizer.CodigoUsuarioSistema;
                params = {
                    StatusCRUD: this.modelCursosFilmesComments.CodigoCursoFilmeComments > 0 ? 'UPDATE' : 'CREATE',
                    formValues: this.modelCursosFilmesComments,
                };
                this.sendRequest('spCursoFilmeComments', params, function (resultado) {
                    if (params.StatusCRUD === 'CREATE') {
                        _this.collectionCursoFilmecomments.push(JSON.parse(atob(resultado.results))[0]);
                        _this.collectionFilterFilmesComments = _this.collectionCountFilmesComments;
                    }
                    else if (params.StatusCRUD === 'UPDATE') {
                        _this.collectionFilterFilmesComments = _this.collectionCursoFilmecomments.map(function (item, index) {
                            if (item.modelCursosFilmesComments === _this.modelCursosFilmesComments) {
                                item = JSON.parse(atob(resultado.results))[0];
                            }
                            return item;
                        });
                        _this.collectionCursoFilmecomments = _this.collectionFilterFilmesComments;
                    }
                    // this.resetModelCursoFilmecomments();
                    _this.flagForm = false;
                    // this.readCursoFilmesComments(this.model.CodigoFilme);
                    _this.api.play();
                });
                return [2 /*return*/];
            });
        });
    };
    FilmesPage.prototype.read = function (pPageNumber, pRowsPage) {
        var _this = this;
        // Obtendo a informação do banco de dados    
        var params = {
            StatusCRUD: 'READ',
            formValues: {
                pageNumber: pPageNumber,
                rowspPage: pRowsPage
            }
        };
        this.sendRequest('spFilmes', params, function (resultado) {
            _this.collection = JSON.parse(atob(resultado.results));
            _this.collectionFilter = _this.collection;
            _this.RecordCount = _this.collectionFilter[0].RecordCount;
            // this.showPages(this.PageNumber, this.RowsPage);
            // this.modelPesquisa.Pagina = this.paginas[0];
        });
    };
    FilmesPage.prototype.playForm = function (model) {
        // tslint:disable-next-line: forin
        for (var key in model) {
            this.model[key] = model[key];
            this.modeli[key] = model[key];
        }
        this.flagFormPlay = true;
        // this.readCursoFilmesComments(this.modelCursosFilmesComments.CodigoCursoFilme);
    };
    FilmesPage.prototype.playFormClose = function () {
        this.flagFormPlay = false;
    };
    FilmesPage.prototype.goBack = function () {
        if (this.flagForm) {
            // Se o formulario está ativo, então altera a flagForm para que mostre a lista
            this.flagForm = false;
        }
        else if (this.flagFiltroAvanzado) {
            // Se o Filtro avanzado está mostrando, então altera a flagFiltroAvanzado para que mostre o filtro basico
            this.flagFiltroAvanzado = false;
            this.collectionFilter = this.collection;
        }
        else {
            this.navCtrl.back();
        }
    };
    FilmesPage.prototype.formatMask = function (fieldName, Value, type) {
        this.modelCursosFilmesComments[fieldName] = this.env.formatMask(Value, type);
        // console.log(value);
    };
    FilmesPage.prototype.resetModel = function () {
        // tslint:disable-next-line: forin
        for (var key in this.model) {
            this.model[key] = '';
        }
    };
    FilmesPage.prototype.getItems = function (ev) {
        // this.CarregaMenuPrincipalStatic();
        this.collectionFilter = this.collection;
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.collectionFilter = this.collectionFilter.filter(function (item) {
                return ((item.Title.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.SubTitle.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Author.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.Description.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
    };
    FilmesPage.prototype.getItemsComments = function (ev) {
        // this.CarregaMenuPrincipalStatic();
        this.collectionFilterFilmesComments = this.collectionCursoFilmecomments;
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.collectionFilterFilmesComments = this.collectionFilterFilmesComments.filter(function (item) {
                return ((item.Comentario.toLowerCase().indexOf(val.toLowerCase()) > -1)
                    || (item.DurationBegin.toLowerCase().indexOf(val.toLowerCase()) > -1)
                    || (item.DurationEnd.toLowerCase().indexOf(val.toLowerCase()) > -1)
                    || (item.NomeUsuarioComentario.toLowerCase().indexOf(val.toLowerCase()) > -1)
                // || (item.NomeUsuarioRespondeu.toLowerCase().indexOf(val.toLowerCase()) > -1 )
                );
            });
        }
    };
    FilmesPage.prototype.submitFiltrar = function (form) {
        this.collectionFilter = this.collection;
        var dados = form.value;
        this.collectionFilter = this.env._findWhere(this.collectionFilter, dados);
    };
    FilmesPage.prototype.create = function () {
        this.resetModel();
        this.flagForm = true;
    };
    FilmesPage.prototype.getLengh = function () {
        // console.log("Passou aqui sim....");
        return this.modelCursosFilmesComments.Comentario.length;
    };
    /* setFocus(input: MatInput) {
      input.focus();
    } */
    FilmesPage.prototype.setDurationBegin = function () {
        var date = new Date(0);
        date.setSeconds(this.api.currentTime);
        this.modelCursosFilmesComments.DurationBegin = date.toISOString().substr(11, 8);
        date.setSeconds(this.api.currentTime + 30);
        this.modelCursosFilmesComments.DurationEnd = date.toISOString().substr(11, 8);
    };
    FilmesPage.prototype.setDurationEnd = function () {
        var date = new Date(0);
        date.setSeconds(this.api.currentTime);
        this.modelCursosFilmesComments.DurationEnd = date.toISOString().substr(11, 8);
    };
    FilmesPage.prototype.mostrarPop = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popover, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: PopinfoComponent,
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, popover.onWillDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        if (typeof data !== 'undefined') {
                            if (data.item === 'BUSCAR') {
                                this.flagFiltroAvanzado = true;
                                this.flagForm = false;
                                this.collectionFilter = [];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FilmesPage.prototype.player = function (model) {
        // console.log(model);    
        this.playForm(model);
    };
    FilmesPage.prototype.edit = function (model) {
        // console.log(model);    
        this.playForm(model);
    };
    FilmesPage.prototype.changeSelect = function (modelAttr, e) {
        this.model[modelAttr] = e.target.value;
    };
    /*
    public showPagination() {
      let tot: number;
      let pag: number;
      tot = this.collection[0].total;
  
      pag = tot / this.modelPesquisa.RowspPage;
      if (pag < 1) {
        pag = 1;
      }
  
      for (let i = 0; i < pag; i++) {
        let num: number;
        num = i + 1;
  
        if (i === 0) {
          this.paginas  = [
            {
              numero : num,
              nome: 'Página ' + num.toString()
            }
          ];
        } else {
          this.paginas.push( {
            numero : num,
            nome: 'Página ' + num.toString()
          });
        }
      }
      this.modelPesquisa.Pagina = this.paginas[0];
    }
    */
    FilmesPage.prototype.showPages = function (pPageNumber, pRowsPage) {
        this.Paginas = [];
        for (var i = pPageNumber; i < pRowsPage; i++) {
            this.Paginas.push({
                PageNumber: i
            });
        }
    };
    FilmesPage.prototype.selecionaPagina = function (numero) {
        if (numero < 100) {
            if ((numero + this.RowsPageDef) < this.RecordCount) {
                if ((numero > 0) || (this.PageNumber > 1)) {
                    this.PageNumber = numero - 1;
                }
                if (this.RecordCount > numero + this.RowsPageDef) {
                    this.PageNumber = numero;
                    this.RowsPage = numero + this.RowsPageDef;
                }
            }
            else {
                this.PageNumber = 1;
                this.RowsPage = (this.RowsPageDef + 1);
            }
        }
        else if (numero === 1000) {
            this.PageNumber = 1;
            this.RowsPage = (this.RowsPageDef + 1);
        }
        else if (numero === 1001) {
            if (this.PageNumber <= (this.RowsPageDef + 1)) {
                this.PageNumber = 1;
                this.RowsPage = (this.RowsPageDef + 1);
            }
            else {
                this.PageNumber = this.PageNumber - this.RowsPageDef;
                this.RowsPage = this.PageNumber + this.RowsPageDef;
            }
        }
        else if (numero === 1002) {
            if (this.PageNumber + this.RowsPageDef >= this.RecordCount) {
                this.PageNumber = this.RecordCount - (this.RowsPageDef - 1);
                this.RowsPage = this.RecordCount + 1;
            }
            else {
                this.PageNumber = this.PageNumber + this.RowsPageDef;
                this.RowsPage = this.RowsPage + this.RowsPageDef;
            }
        }
        else if (numero === 1003) {
            this.RowsPage = this.RecordCount + 1;
            this.PageNumber = this.RecordCount - (this.RowsPageDef - 1);
        }
        this.read(this.PageNumber, this.RowsPageDef);
        // console.log('Número:' + numero + ', Página:' + this.PageNumber + ', Linha:' + this.RowsPage)
    };
    tslib_1.__decorate([
        ViewChild('txtComentario'),
        tslib_1.__metadata("design:type", Object)
    ], FilmesPage.prototype, "iComentario", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], FilmesPage.prototype, "duration", void 0);
    FilmesPage = tslib_1.__decorate([
        Component({
            selector: 'app-filmes',
            templateUrl: './filmes.page.html',
            styleUrls: ['./filmes.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef,
            NavController,
            AlertService,
            AuthService,
            EnvService,
            PopoverController,
            Router,
            Platform])
    ], FilmesPage);
    return FilmesPage;
}());
export { FilmesPage };
//# sourceMappingURL=filmes.page.js.map