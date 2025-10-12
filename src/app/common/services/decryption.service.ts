import * as CryptoJS from 'crypto-js';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DecryptionService {
  private secretKey = 'MySuperSecretKey';

  decrypt(encryptedData: string): any {
    const parts = encryptedData.split(':');
    const iv = CryptoJS.enc.Base64.parse(parts[0]);
    const cipherText = CryptoJS.enc.Base64.parse(parts[1]);

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: cipherText } as any,
      CryptoJS.enc.Utf8.parse(this.secretKey),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }
}
