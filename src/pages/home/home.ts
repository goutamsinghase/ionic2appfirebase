import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public posts: any[];
  public keys: String[];
  public username: String;
  public message: String;
  constructor(public navCtrl: NavController,
   public loadingCtrl: LoadingController,
   private authProvider: Auth) {
  	this.username = '';
  	this.message = '';
  }

  loadPosts() {
     let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Loading ..."
    });
    loader.present();
    console.log(firebase);
     this.authProvider.getAllPosts()
    	.then( posts => {
       		loader.dismiss().then( () => {
        		console.log('success', posts);
        		this.posts = posts;
        		this.keys = Object.keys(this.posts);
      		});
    	}, error => {
      		loader.dismiss().then( () => {
      		console.log('error');
      		})});
     
  }

  writeNewPost() {
      let myUserId = firebase.auth().currentUser.uid,
      author= firebase.auth().currentUser.email;
      console.log(firebase.auth().currentUser);
	  // A post entry.
	  let postData = {
	    author: author,
	    message: this.message
	  };

	  // Get a key for a new Post.
	  let newPostKey = firebase.database().ref().child('posts').push().key;

	  // Write the new post's data simultaneously in the posts list and the user's post list.
	  let updates = {};
	  updates['/posts/' + newPostKey] = postData;
	  updates['/user-posts/' + myUserId + '/' + newPostKey] = postData;

	  return firebase.database().ref().update(updates);
  }

}
