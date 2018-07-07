import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {

  product: any;
  WooCommerce: any;
  reviews: any[] = [];
  // selectedOptions: any = {};
  // requireOptions: boolean = true;
  // productVariations: any[] = [];
  // productPrice: number = 0.0;
  // selectedVariation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.product = this.navParams.get("product");
    console.log(this.product);

     this.WooCommerce = WC({
      url: "http://localhost:8080/wordpress/",
      consumerKey: "ck_c03d01a3639301b1eb07b503cc33e3cb5032adfd",
      consumerSecret: "cs_657da7da3c888c58cc034a9fa5bfd30779836c7b"
    });

     this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then((data) => {

       this.reviews = JSON.parse(data.body).product_reviews;
       console.log(this.reviews);

     }, (err) => {
       console.log(err);
     })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
