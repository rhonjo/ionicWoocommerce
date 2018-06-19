import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

    this.page = 2;

    this.WooCommerce = WC({
      url: "http://localhost:8080/wordpress/",
      consumerKey: "ck_c03d01a3639301b1eb07b503cc33e3cb5032adfd",
      consumerSecret: "cs_657da7da3c888c58cc034a9fa5bfd30779836c7b"
    });

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
        console.log(err);
    })

  }

  ionViewDidLoad() {
    setInterval(() => {

      if(this.productSlides.getActiveIndex() == this.productSlides.length() -1) {
        this.productSlides.slideTo(0)
      }

      this.productSlides.slideNext();
    }, 3000)
  }




  loadMoreProducts(event) {
    if (event == null) {
      this.page = 2;
      this.moreProducts = [];
    } else {
      this.page ++;
    }
    this.WooCommerce.getAsync("products?page=" + this.page).then((data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null) {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 100 && event != null) {
        event.enable(false);

        this.toastCtrl.create({
          message: "No More Products",
          duration: 5000
        }).present();
      }

      }, (err) => {
      console.log(err);
    })

  }

}
