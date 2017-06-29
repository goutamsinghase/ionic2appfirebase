import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
   error: any;
   form: any;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
    private loadingCtrl: LoadingController,
     private alertCtrl: AlertController, 
     private authProvider: Auth) {
    this.form = {
      email: '',
      password: ''
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

   login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.authProvider.loginUser(this.form.email, 
        this.form.password)
    .then( authData => {
       loading.dismiss().then( () => {
        console.log('success');
        this.navCtrl.setRoot(HomePage);
      });
    }, error => {
      loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
  }

}
