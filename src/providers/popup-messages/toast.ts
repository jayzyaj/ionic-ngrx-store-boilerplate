import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastProvider {

    constructor(public toastCtrl: ToastController) { }

    showNormalToastMessage(msg) {
        const toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(() => console.log('Dismissed toast'));
        toast.present();
    }

}
