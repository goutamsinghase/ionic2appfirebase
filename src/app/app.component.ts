import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  zone: NgZone;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      firebase.initializeApp({
        apiKey: "AIzaSyD4jfJNSKWguIv4PL8Y8YD2MRG9g7hOc8c",
        authDomain: "quureo-a31b2.firebaseapp.com",
        databaseURL: "https://quureo-a31b2.firebaseio.com",
        projectId: "quureo-a31b2",
        storageBucket: "quureo-a31b2.appspot.com",
        messagingSenderId: "35518438842"
      });

      this.zone = new NgZone({});
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        this.zone.run( () => {
          if (!user) {
             console.log(user);
            this.rootPage = Login;
            unsubscribe();
          } else { 
            this.rootPage = HomePage;
            unsubscribe();
          }
        });     
      });
    });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {
              // Sign-out successful.
              console.log('sucess');
              
        }, function(error) {
              // An error happened.
        });
    this.zone = new NgZone({});
    this.zone.run( () => {
        this.nav.setRoot(Login);
    });
  }
}

