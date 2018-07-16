import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Signup } from '../signup/signup';
import { Login } from '../login/login';
import { Cart } from '../cart/cart';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';
import { ProductsByCategory } from '../products-by-category/products-by-category';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: any;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;
  loggedIn: boolean;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public modalCtrl: ModalController) {
      this.homePage = HomePage
       this.categories = [];
        this.user = {};


    this.WooCommerce = WC({
      url: "http://localhost:8080/wordpress/",
      consumerKey: "ck_c03d01a3639301b1eb07b503cc33e3cb5032adfd",
      consumerSecret: "cs_657da7da3c888c58cc034a9fa5bfd30779836c7b"
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for(let i = 0; i < temp.length; i++) {
        if(temp[i].parent == 0) {
            temp[i].icon = temp[i].image
//          temp[i].icon = "pricetag";
//          console.log(temp[i].slug)
//          console.log(temp[i].icon)
//          if(temp[i].slug == "accessories") {
//            temp[i].icon = "temp[i].image";
//          }
//          if(temp[i].slug == "dress-shirts") {
//             temp[i].icon = temp[i].image;
//         }
//          if(temp[i].slug == "poster") {
//            temp[i].icon = "images";
//          }


          this.categories.push(temp[i])
        }
      }
    }, (err)=> {
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ionViewDidEnter() {

    this.storage.ready().then(() => {
      this.storage.get("userLoginInfo").then((userLoginInfo) => {

        if (userLoginInfo != null) {

          console.log("User logged in...");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        } else {
          console.log("No user found.");
          this.user = {};
          this.loggedIn = false;
        }

      })
    })


  }

  openCategoryPage(category) {

    this.childNavCtrl.setRoot(ProductsByCategory, { "category": category });

  }

  openPage(pageName: string) {
    console.log(pageName);
    if (pageName == "signup") {
      this.navCtrl.push(Signup);
    }
    if (pageName == "login") {
      this.navCtrl.push(Login);
    }
    if (pageName == 'logout') {
      this.storage.remove("userLoginInfo").then(() => {
        this.user = {};
        this.loggedIn = false;
      })
    }
    if (pageName == 'cart') {
      let modal = this.modalCtrl.create(Cart);
      modal.present();
    }

  }

}
