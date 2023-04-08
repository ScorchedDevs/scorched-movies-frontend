import { Injectable } from '@angular/core';
import iziToast, { IziToastSettings } from 'izitoast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly baseToast: IziToastSettings = {
    position: 'bottomRight',
    timeout: 10000,
    closeOnClick: true,
  };

  success(successMessage: string): void {
    iziToast.success({
      ...this.baseToast,
      message: successMessage,
    });
  }

  error(errorMessage: string): void {
    iziToast.error({ ...this.baseToast, message: errorMessage });
  }
}
