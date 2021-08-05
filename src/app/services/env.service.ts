import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EnvService {
  API_HOST   = 'https://wearplace.com.br';
  API_URL    = '/ServiceWoppa/api';
  //API_URL    = '/ServiceEngineOS/api';
  
  
  //API_HOST = 'http://209.126.103.206';  
  // API_HOST = 'http://192.168.0.4';  
  //API_HOST = 'http://192.168.15.2:60313'
  //API_URL = '/api';
  
  API_HOST_DEBUG = 'http://localhost:60313';
  API_URL_DEBUG = '/api';
  DEFINE_ENV = 'Dev'; // Define: [ Debug, Dev, Homo, Prod ]

  private DECIMAL_SEPARATOR = '.';
  private GROUP_SEPARATOR = ',';
  private pureResult: any;
  private maskedId: any;
  private val: any;
  private v: any;


  name = 'Angular';
  base64TrimmedURL: any;
  base64DefaultURL: any;
  generatedImage: any;d

  constructor(
  ) {


  }

  /*
   // Base64 url of image trimmed one without data:image/png;base64
   string base64="/9j/4AAQSkZJRgABAQE...";
   // Naming the image
   const date = new Date().valueOf();
   let text = '';
   const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   for (let i = 0; i < 5; i++) {
     text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
   }
   // Replace extension according to your media type
   const imageName = date + '.' + text + '.jpeg';
   // call method that creates a blob from dataUri
   const imageBlob = this.dataURItoBlob(base64);
   const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
 */


  getBase64Image(img: HTMLImageElement) {
    // We create a HTML canvas object that will create a 2d image
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    // This will draw image    
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    var dataURL = canvas.toDataURL("image/png");
    this.base64DefaultURL = dataURL;
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }


  /*   getImage(url) {
      this.getBase64ImageFromURL(url).subscribe((data: string) => {
        this.base64TrimmedURL = data;
      });
      // Naming the image
      const date = new Date().valueOf();
      let text = '';
      const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
        text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
      }
      // Replace extension according to your media type like this 
      const imageName = date + '.' + text + '.jpeg';
      console.log(imageName);
      // call method that creates a blob from dataUri
      let imageBlob;
      this.dataURItoBlob(this.base64TrimmedURL).subscribe(data => {
        imageBlob = data;
      });
      const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
      this.generatedImage = window.URL.createObjectURL(imageFile);
      window.open(this.generatedImage);
    }
   */

  /**
   * Funcao para encontrar objetos em uma coleccao de objetos
   * Exemplo: collection = _findWhere(collection, { key1: val1, keyN: valN })
   * @param collection Array no qual vai ser procurado algum item
   * @param arg objeto com os valores de pesquisa
   */
  _findWhere(collection: any[], arg: object | null) {

    function callback(currentValue, index, array) {
      let flag: any = true;

      for (const key in arg) {
        if (flag) {
          if (currentValue.hasOwnProperty(key)) {
            if (currentValue[key] === null) {
              currentValue[key] = '';
            }
            if (Number(currentValue[key])) {
              currentValue[key] = currentValue[key].toString();
            }
            if (Number(arg[key])) {
              arg[key] = arg[key].toString();
            }
            flag = (currentValue[key].toLowerCase().indexOf(arg[key].toLowerCase()) > -1) ? true : false;
          }
        }
      }

      if (flag) {
        return currentValue;
      }
    }

    return collection.filter(callback, arg);

  }





  formatMask(value: any, type: any) {
    if (!value) {
      return '';
    }
    const val = value.toString();
    const parts = this.unFormatMask(val).split(this.DECIMAL_SEPARATOR);
    this.pureResult = parts;
    if (type === 'CPFCNPJ') {
      if (parts[0].length <= 11) {
        this.maskedId = this.cpf_mask(parts[0]);
        return this.maskedId;
      } else {
        this.maskedId = this.cnpj(parts[0]);
        return this.maskedId;
      }
    }
    if (type === 'CEP') {
      this.maskedId = this.cep(parts[0]);
      return this.maskedId;
    }
    if (type === 'TELEFONE') {
      this.maskedId = this.telefone(parts[0]);
      return this.maskedId;
    }
    if (type === 'RAMAL') {
      this.maskedId = this.ramal(parts[0]);
      return this.maskedId;
    }

    if (type === 'TIME') {
      this.maskedId = this.time(parts[0]);
      return this.maskedId;
    }


  }

  unFormatMask(val: any) {
    if (!val) {
      return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  }



  cpf_mask(v: any) {
    v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    // de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

  cnpj(v: any) {
    v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
    return v;
  }

  time(v: any) {
    v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
    v = v.replace(/(\d{2})(\d)/, '$1:$2'); // Coloca : entre o segundo e o quarto dígitos
    v = v.replace(/(\d{2})(\d)/, '$1:$2'); // Coloca : entre o segundo e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1:$2'); // Coloca : entre o quarto e o sexto dígitos
    return v;
  }


  ramal(v: any) {
    v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o segundo e o quarto dígitos    
    return v;
  }


  cep(v: any) {
    v = v.replace(/\D/g, '');                           // Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, '$1.$2');             // Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/\.(\d{3})(\d)/, '.$1-$2');           // Coloca uma barra entre o oitavo e o nono dígitos    
    return v;
  }

  telefone(v: any) {
    v = v.replace(/\D/g, '');             		 // Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, '$1-$2');  // Coloca hífen entre o quarto e o quinto dígitos
    return v.substr(0, 15);
  }

  celular(v: any) {
    v = v.replace(/\D/g, '');             		 // Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, '$1-$2');  // Coloca hífen entre o quarto e o quinto dígitos
    return v.substr(0, 15);
  }

  MoedaReal(v: any) {
    v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
    return v;
  }



  /*
  
    validarCNPJ(cnpj: any) {
  
      cnpj = cnpj.replace(/[^\d]+/g, '');
      if (cnpj === '') { return false; }
      if (cnpj.length !== 14) { return false; }
  
      // Elimina CNPJs invalidos conhecidos
      if (
        cnpj === '00000000000000' ||
        cnpj === '11111111111111' ||
        cnpj === '22222222222222' ||
        cnpj === '33333333333333' ||
        cnpj === '44444444444444' ||
        cnpj === '55555555555555' ||
        cnpj === '66666666666666' ||
        cnpj === '77777777777777' ||
        cnpj === '88888888888888' ||
        cnpj === '99999999999999') {
        return false;
      }
      // Valida DVs
      let ntamanho: number = (cnpj.length - 2)
      const nnumeros: number = cnpj.substring(0, tamanho);
      const ndigitos: number = cnpj.substring(tamanho);
      let nsoma = 0;
      let npos: number = ntamanho - 7;
      for (let i = ntamanho; i >= 1; i--) {
        nsoma += nnumeros.charAt(ntamanho - i) * npos--;
        if (npos < 2) {
          npos = 9;
        }
      }
      // tslint:disable-next-line: label-position
      sresultado: number = nsoma % 11 < 2 ? 0 : 11 - nsoma % 11;    
      if (sresultado !== ndigitos.charAt(0)) { return false; }
  
      ntamanho = ntamanho + 1;
      const numeros = cnpj.substring(0, ntamanho);
      let soma = 0;
      let pos = ntamanho - 7;
      for (let i = ntamanho; i >= 1; i--) {
        soma += numeros.charAt(ntamanho - i) * pos--;
        if (pos < 2) { pos = 9; }
      }
      const sresultado: number = nsoma % 11 < 2 ? 0 : 11 - soma % 11;
      if (sresultado !== ndigitos.charAt(1)) { return false; }
  
      return true;
  
    }
    */


}
