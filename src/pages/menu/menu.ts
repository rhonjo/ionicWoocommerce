import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Signup } from '../signup/signup';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.homePage = HomePage
       this.categories = [];


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

          temp[i].icon = "pricetag";

          if(temp[i].slug == "clothing") {
            temp[i].icon = "shirt";
          }
          if(temp[i].slug == "music") {
            temp[i].icon = "musical-notes";
          }
          if(temp[i].slug == "poster") {
            temp[i].icon = "images";
          }


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

  openCategoryPage(category) {

    this.childNavCtrl.setRoot(ProductsByCategory, { "category": category });

  }

  openPage(pageName: string) {
    console.log(pageName);
    if (pageName == "signup") {
      this.navCtrl.push(Signup);
    }

  }

}
