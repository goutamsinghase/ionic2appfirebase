import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Auth {

  constructor(public http: Http) {
    console.log('Hello Auth Provider');
  }
  
  loginUser(email: string, password: string): firebase.Promise<any> {
	return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  getAllPosts():firebase.Promise<any>{
     return new Promise( (resolve, reject) => {
		firebase.database().ref('posts')
				.on('value', (data) => {
				      console.log(data);
					resolve(data.val());
				});
		});
  }

}
