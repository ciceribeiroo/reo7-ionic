import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
@NgModule({
  imports: [
    IonicModule
  ]
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private tosastController: ToastController, public alertController: AlertController) {}

    async presentAlert(msg: string) {
      const alert = await this.alertController.create({
        header: 'Atenção!',
        subHeader: `Seu IMC foi classificado como ${msg}`,
        message: 'Para mais informações, procure um profissional de saúde',
        buttons: ['Entendi'],
      });
    
      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);
    }
    isFormValid(){
      return (this.height && this.weight && this.height>0 && this.weight >0);
    }
    onCalculate(){
      const imc = this.weight / (this.height*this.height)
      const msg = this.category(imc);
      if(msg == 'Obesidade' || msg == 'Obesidade Grave'){
        this.presentAlert(msg);
      }
      this.showMessage(`Seu IMC é ${imc.toFixed(3)} que corresponde a categoria ${msg}`)
    }
    category(imc: number){
      if(imc < 18.5){
          return 'Magreza'
      }
      else if(imc >= 18.5 && imc< 24.9){
          return 'Normal'
      }else if(imc >= 25 && imc < 29.9){
          return 'Sobrepeso'
      }else if(imc >= 30 && imc < 39.9){
          return 'Obesidade'
      }else{
          return 'Obesidade Grave'
      }
    }

    async showMessage(msg: string){
        const previousToast = await this.tosastController.getTop();
        if(previousToast){
          //return; -> se alterou os valores não recalcula
          await this.tosastController.dismiss();
        }

        const toast = await this.tosastController.create({
            message: msg,
            color: 'light',
            buttons: [{
              icon: 'close'
            }]
        });
        toast.present();
    }
}
