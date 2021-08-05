import { Injectable } from '@angular/core';
import { Platform, NavController } from '@ionic/angular'
// import { Network }      from '@ionic-native/network';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from './env.service';
// import { tap }          from 'rxjs/operators';
// import { User }         from '../models/user';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
// import { Base64 } from '@ionic-native/base64/ngx';
import { Storage } from '@ionic/storage';
import { NetWork } from './net.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new Headers();

  private coletionsData: any;
  public isLoggedIn = false;
  public IsInternet = false;
  public CodigoUsuarioSuporte: string;
  public CodigoUsuarioSistema: string;
  public NomeUsuarioSistema: string;
  public Matricula: string;
  public CpfCnpjEmpresa: string;

  public CodigoMenuPai: any = 99;
  public CodigoMenuGrupoL: any = 100;
  public CodigoMenuGrupoP: any = 99;
  public SessionIPCliente: string;
  public HashKey: string;
  public Filter: string;
  public formTitle: any = 'Menu - Principal';
  public formSubTitle: string;

  public API_HOST: string = this.env.API_HOST;
  public API_URL: string = this.env.API_URL;
  public DEFINE_ENV: string;

  // 13/12/2019, Lina
  // Permissoes do usuário
  public permissoesUsuario: any = [];


  constructor(
    private http: HttpClient,
    private platform: Platform,
    private env: EnvService,
    private alertService: AlertService,
    private network: NetWork,
    private db: Storage
  ) {
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
    if (this.env.DEFINE_ENV === 'Debug') {
      this.API_HOST = env.API_HOST_DEBUG;
      this.API_URL = env.API_URL_DEBUG;
    }
    
  }

  async ConectionInet() {

    // Uso a instrução (fetch) para pegar o ip do roteador.
    const ipAPI: any = 'https://api.ipify.org?format=json'
    fetch(ipAPI).then(response => response.json()).then(data =>
      sessionStorage.setItem('SessionIP', data.ip)).catch(() => { }
    );

    const inet = await this.network.NetworkStatus(sessionStorage.SessionIP);
    this.IsInternet = inet[0].Sucess;
    // console.log(inet[0].Message);


    // Este método retorna ON/OFF do Serviço onde esta API.
    // this.Authorizer.EngineStatusConection(this.env.API_HOST);  

    // Teste de recuperação de dados

    // Zero a SessionConection

  }


  public setFilter(filtro: string) {
    this.Filter = filtro;
  }

  public getFilter() {
    if (typeof (this.Filter) === 'undefined') {
      this.Filter = '';
    }
    if (this.Filter == null) {
      this.Filter = '';
    }
    return this.Filter;
  }

  iLogin = async function (form: NgForm) {
    // --------------------------------------------------------------------------------------------    
    // Função Login
    // Criação / Atualização: 20/02/2020 as 11h30m
    // Por Gilson DeLima
    // --------------------------------------------------------------------------------------------          
    // console.log((EngineAPI);
    return new Promise((resolve) => {
      
      const ParamDataJson = btoa(JSON.stringify(form.value));   // encode string
      const strDataJson   = atob(ParamDataJson);                // decode string
      const StoreProcName = 'spUsuarioAuthentication';

      const paramUrlAPI = this.API_HOST + this.API_URL + '/authentication?';
      const paramsAPI = 'StoreProcName=' + StoreProcName + '&DataJson=' + ParamDataJson;

      const EngineAPI = paramUrlAPI + paramsAPI

      if (navigator.onLine) {
        this.coletionsData = this.http.get(EngineAPI);
        this.coletionsData.subscribe(
          data => {
            
            if (data[0].success) {
              this.HashKey = data[0].hashkey;
              const resultado: any = atob(data[0].results);
              // this.CodigoUsuarioSuporte = JSON.parse(resultado)[0].CodigoUsuarioSuporte;
              this.CodigoUsuarioSistema = JSON.parse(resultado)[0].CodigoUsuario;
              this.CodigoUsuarioSuporte = JSON.parse(resultado)[0].CodigoUsuarioSuporte;
              this.NomeUsuarioSistema = JSON.parse(resultado)[0].Nome;
              this.Matricula = JSON.parse(resultado)[0].Matricula;
              this.permissoesUsuario = this.consultarPermisoes();
              this.db.set('LSU', data[0].results);
              this.db.set('HKEY', data[0].hashkey);
            }
            
            const ResultsDecode = JSON.parse(this.utf8Decode(JSON.stringify(atob(data[0].results))));
            
            data[0].results = btoa(ResultsDecode);
            const sucess = data[0].success;
            const message = data[0].message;
            const results = btoa(ResultsDecode);

            const metadata = [];
            metadata.push({
              Sucess: sucess,
              Message: message,
              Results: results
            });
            resolve(metadata);
          },
          (error: any) => {
            const metadata = [];
            const sucess = false;
            const message = 'Servidor Indisponível:' + error.status + ' | ' + error.statusText;
            const results = [];
            metadata.push({
              Sucess: sucess,
              Message: message,
              Results: results
            });
            resolve(metadata);
          }
        );
      } else {
        const metadata = [];
        const sucess = false;
        const message = 'Dispositivo desconectado. Certifique-se de que seu dispositivo tem conexão ativa com a internet.';
        const results = [];
        metadata.push({
          Sucess: sucess,
          Message: message,
          Results: results
        });
        resolve(metadata);
      }
    });
  };

  configUrl = 'assets/config.json';
  getConfig() {
    return this.http.get(this.configUrl);
  }



  async Login(form: NgForm) {
    // --------------------------------------------------------------------------------------------    
    // Função Login
    // Criação / Atualização: 20/02/2020 as 11h30m
    // Por Gilson DeLima
    // --------------------------------------------------------------------------------------------    

    const ParamDataJson = btoa(JSON.stringify(form.value)); // encode string
    const strDataJson = atob(ParamDataJson);                // decode string
    const StoreProcName = 'spUsuarioAuthentication';

    const paramUrlAPI = this.API_HOST + this.API_URL + '/authentication?';
    const paramsAPI = 'StoreProcName=' + StoreProcName + '&DataJson=' + ParamDataJson;

    const EngineAPI = paramUrlAPI + paramsAPI
    // console.log((EngineAPI);
    return new Promise((resolve) => {
      this.coletionsData = this.http.get(EngineAPI);
      this.coletionsData.subscribe(
        data => {
          if (data[0].success) {
            this.HashKey = data[0].hashkey;
            const resultado: any = atob(data[0].results);
            // this.CodigoUsuarioSuporte = JSON.parse(resultado)[0].CodigoUsuarioSuporte;
            this.CodigoUsuarioSistema = JSON.parse(resultado)[0].CodigoUsuario;
            this.CodigoUsuarioSuporte = JSON.parse(resultado)[0].CodigoUsuarioSuporte;
            this.NomeUsuarioSistema = JSON.parse(resultado)[0].Nome;
            this.permissoesUsuario = this.consultarPermisoes();
            this.db.set('LSU', data[0].results);
            this.db.set('HKEY', data[0].hashkey);
          } else {
            sessionStorage.setItem('SessionConection', '0');
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Autendicação no Sistema', pMessage: data[0].message });
          }
          const ResultsDecode = JSON.parse(this.utf8Decode(JSON.stringify(atob(data[0].results))));
          data[0].results = btoa(ResultsDecode);
          resolve(data);
        },
        (error: any) => {
          this.alertService.presentAlert({
            pTitle: 'Atenção',
            pSubtitle: 'Servidor Indisponível. Tente mais tarde!!!',
            pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
          });
        }
      );
    });
  };

  FailurePost = async function (method: string, form: NgForm) {
    // --------------------------------------------------------------------------------------------    
    // Função _failure_post - executar chamadas post
    // Criação / Atualização: 04/01/2020 as 14:01
    // Por Gilson DeLima e Teresio San-Fer II
    // --------------------------------------------------------------------------------------------

    const json: string = JSON.stringify(form.value);
    // console.log('dados:', json);

    const paramMethod = method;
    const paramUrlAPI = this.env.API_HOST + this.env.API_URL + + '/' + paramMethod;

    const ParamDataJson = btoa(json); // encode string
    const data2 = { JsonParam: ParamDataJson };

    return new Promise(resolve => {
      this.coletionsData = this.http.post(paramUrlAPI, data2);
      this.coletionsData.subscribe(
        data => {
          resolve(data);
        },
        (error: any) => {
          resolve(error);
          /*
           this.alertService.presentAlert(
            { pTitle: "Atenção",
              pSubtitle: 'Servidor ou Método Indisponível. Tente mais tarde!!!',
              pMessage: 'Status Error:' + error.status + ' | ' + error.statusText });
              // console.log("Error: ", error);
            */
        }
      );
    });
  };


  /* QueryStoreProc = async function (MetodoNameAPI: string, StoreProcName: string, ParamsJson: any) {
    // --------------------------------------------------------------------------------------------
    // Função Gerenerica de consulta no Service API
    // Criação / Atualização: 29/07/2019 as 10:42
    // Por Gilson DeLima
    // --------------------------------------------------------------------------------------------

    ParamsJson = this.utf8Encode(JSON.stringify(ParamsJson));
    ParamsJson = ParamsJson.replace(/\\/g, '');
    // console.log('json:', ParamsJson);
    const ParamDataJson = btoa(ParamsJson); // encode string

    // const ParamDataJson = btoa(JSON.stringify(ParamsJson)); // encode string  
    const paramUrlAPI = this.API_HOST + this.API_URL + '/' + MetodoNameAPI + '?';
    const paramsAPI = 'StoreProcName=' + StoreProcName + '&DataJson=' + ParamDataJson;
    const EngineAPI = paramUrlAPI + paramsAPI;
    const EngineAPIDebug = this.env.API_HOST_DEBUG + this.env.API_URL_DEBUG + '/' + MetodoNameAPI + '?' + paramsAPI;
    // console.log(EngineAPI);
    // this.alertService.presentToast('Processando...', 3000);
    return new Promise((resolve) => {
      this.coletionsData = this.http.get(EngineAPI);
      this.coletionsData.subscribe(
        data => {          
          const ResultsDecode = JSON.parse(this.utf8Decode(JSON.stringify(atob(data[0].results))));
          data[0].results = btoa(ResultsDecode);
          resolve(data);
        },
        (error: any) => {
          this.alertService.presentAlert({
            pTitle: 'Atenção',
            pSubtitle: 'Servidor ou Método Indisponível (' + StoreProcName + '). Tente mais tarde!!!',
            pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
          });
          resolve(error);
        }
      );
    });
  };
 */

  QueryStoreProc = async function (MetodoNameAPI: any, pStoreProcName: string, ParamsJson: any)  {
    // --------------------------------------------------------------------------------------------    
    // Função Gerenerica de consulta no Service API
    // Criação / Atualização: 29/07/2019 as 10:42
    // Por Gilson DeLima
    // --------------------------------------------------------------------------------------------
    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
    // --------------------------------------------------------------------------------------------
    // this.alertService.showLoader("Processando... Aguarde por favor!!!");
    
    // MetodoNameAPI='ExecutarPost';    

    ParamsJson = this.utf8Encode(JSON.stringify(ParamsJson));
    ParamsJson = ParamsJson.replace(/\\/g, '');
    // console.log('json:', ParamsJson);
    const ParamDataJson = btoa(ParamsJson); // encode string

    const paramUrlAPI = this.API_HOST + this.API_URL + '/' + MetodoNameAPI;
    // console.log('api:', paramUrlAPI);

    const dataPost = {
      StoreProcName: pStoreProcName,
      DataJson: ParamDataJson
      // Imagem: 
    };
   // console.log('dataPost:', dataPost);
    // this.alertService.presentToast("Processando...");

    return new Promise(resolve => {
      this.coletionsData = this.http.post(paramUrlAPI, dataPost);
      this.coletionsData.subscribe(
        data => {
          const ResultsDecode = JSON.parse(this.utf8Decode(JSON.stringify(atob(data[0].results))));
          
          data[0].results = btoa(ResultsDecode);
          resolve(data);
        },
        (error: any) => {
          this.alertService.presentAlert({
            pTitle: 'Atenção',
            pSubtitle: 'Servidor ou Método Indisponível (' + pStoreProcName + '). Tente mais tarde!!!',
            pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
          });
          resolve(error);
        }
      );
    });
  };

  
  QueryStoreProcUpLoad = async function (
      MetodoNameAPI: any 
      ,pStoreProcName: string
      ,ParamsJson: any
      ,pdataFile:any
     ) 
    {
    // --------------------------------------------------------------------------------------------    
    // Função Gerenerica de consulta no Service API
    // Criação / Atualização: 29/07/2019 as 10:42
    // Por Gilson DeLima
    // --------------------------------------------------------------------------------------------
    // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
    // --------------------------------------------------------------------------------------------
    // this.alertService.showLoader("Processando... Aguarde por favor!!!");
    
    // MetodoNameAPI='ExecutarPost';    

    ParamsJson = this.utf8Encode(JSON.stringify(ParamsJson));
    ParamsJson = ParamsJson.replace(/\\/g, '');
    // console.log('json:', ParamsJson);
    const ParamDataJson = btoa(ParamsJson); // encode string

    const paramUrlAPI = this.API_HOST + this.API_URL + '/' + MetodoNameAPI;
    // console.log('api:', paramUrlAPI);

    const dataPost = {
      StoreProcName: pStoreProcName
      ,DataJson: ParamDataJson     
      ,DataFile: pdataFile 
    };
   // console.log('dataPost:', dataPost);
    // this.alertService.presentToast("Processando...");

    return new Promise(resolve => {
      this.coletionsData = this.http.post(paramUrlAPI, dataPost);
      this.coletionsData.subscribe(
        data => {
          // const ResultsDecode = JSON.parse(this.utf8Decode(JSON.stringify(atob(data[0].results))));
          // data[0].results = btoa(ResultsDecode);
          resolve(data);
        },
        (error: any) => {
          this.alertService.presentAlert({
            pTitle: 'Atenção',
            pSubtitle: 'Servidor ou Método Indisponível (' + pStoreProcName + '). Tente mais tarde!!!',
            pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
          });
          resolve(error);
        }
      );
    });
  };




  public consultarPermisoes() {
    const params = {
      CodigoUsuarioSistema: this.CodigoUsuarioSistema,
      CodigoMenuSistemaPai: this.CodigoMenuPai,
      Hashkey: this.HashKey
    };
    this.QueryStoreProc('ExecutarPost', 'spPermissoesPorUsuario',params).then(res => {
      const resultado: any = res[0];
      try {
        if (resultado.success) {
          this.permissoesUsuario = JSON.parse(atob(resultado.results));
        } else {
          console.log('Sem permissões');
        }
      } catch (err) {
        console.log('Sem permissões');
      }
    });
  }

  /**
   * Encodes multi-byte Unicode string into utf-8 multiple single-byte characters
   * (BMP / basic multilingual plane only).
   *
   * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars.
   *
   * Can be achieved in JavaScript by unescape(encodeURIComponent(str)),
   * but this approach may be useful in other languages.
   *
   * @param   {string} unicodeString - Unicode string to be encoded as UTF-8.
   * @returns {string} UTF8-encoded string.
   */
  public utf8Encode(unicodeString) {
    if (typeof unicodeString != 'string') throw new TypeError('parameter ‘unicodeString’ is not a string');
    const utf8String = unicodeString.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function (c) {
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
      }
    ).replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function (c) {
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
      }
    );
    return utf8String;
  }

  /**
   Decodes utf-8 encoded string back into multi-byte Unicode characters.
  
   Can be achieved JavaScript by decodeURIComponent(escape(str)),
   but this approach may be useful in other languages.
  
   @param   {string} utf8String - UTF-8 string to be decoded back to Unicode.
   @returns {string} Decoded Unicode string.
  */
  public utf8Decode(utf8String) {
    if (typeof utf8String != 'string') throw new TypeError('parameter ‘utf8String’ is not a string');
    // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
    const unicodeString = utf8String.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function (c) {  // (note parentheses for precedence)
        var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
        return String.fromCharCode(cc);
      }
    ).replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function (c) {  // (note parentheses for precedence)
        var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
        return String.fromCharCode(cc);
      }
    );
    return unicodeString;
  }

  public convertUtf8ToAscii(str: string) {
    var asciiStr = '';
    var refTable = { // Reference table Unicode vs ASCII
      199: 128, 252: 129, 233: 130, 226: 131, 228: 132, 224: 133, 231: 135, 234: 136, 235: 137, 232: 138,
      239: 139, 238: 140, 236: 141, 196: 142, 201: 144, 244: 147, 246: 148, 242: 149, 251: 150, 249: 151
    };
    for (var i = 0; i < str.length; i++) {
      var ascii = refTable[str.charCodeAt(i)];
      if (ascii != undefined)
        asciiStr += "%" + ascii;
      else
        asciiStr += str[i];
    }
    return asciiStr;
  }

  public ascii_to_hexa(str: string) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }

  public UTF8ArrToStr(aBytes: any) {

    var sView = "";

    for (var nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
      nPart = aBytes[nIdx];
      sView += String.fromCharCode(
        nPart > 251 && nPart < 254 && nIdx + 5 < nLen ? /* six bytes */
          /* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
          (nPart - 252) * 1073741824 + (aBytes[++nIdx] - 128 << 24)
          + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12)
          + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
          : nPart > 247 && nPart < 252 && nIdx + 4 < nLen ? /* five bytes */
            (nPart - 248 << 24) + (aBytes[++nIdx] - 128 << 18)
            + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
            : nPart > 239 && nPart < 248 && nIdx + 3 < nLen ? /* four bytes */
              (nPart - 240 << 18) + (aBytes[++nIdx] - 128 << 12)
              + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
              : nPart > 223 && nPart < 240 && nIdx + 2 < nLen ? /* three bytes */
                (nPart - 224 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
                : nPart > 191 && nPart < 224 && nIdx + 1 < nLen ? /* two bytes */
                  (nPart - 192 << 6) + aBytes[++nIdx] - 128
                  : /* nPart < 127 ? */ /* one byte */
                  nPart
      );
    }
    return sView;
  }

}