import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {

  product: any;
  // WooCommerce: any;
  // reviews: any[] = [];
  // selectedOptions: any = {};
  // requireOptions: boolean = true;
  // productVariations: any[] = [];
  // productPrice: number = 0.0;
  // selectedVariation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.product = this.navParams.get("product");
    console.log(this.product);

    // this.WooCommerce = WP.init(true);
    //
    // this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then((data) => {
    //
    //   this.reviews = JSON.parse(data.body);
    //   console.log(this.reviews);
    //
    // }, (err) => {
    //   console.log(err);
    // })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
