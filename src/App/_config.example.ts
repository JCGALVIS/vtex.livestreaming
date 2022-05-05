import { LivestreamingProps } from '../typings/livestreaming';
import { addToCart, getProductByIdCace, getProductsCace } from './helpers';

export const livestreamingConfig: LivestreamingProps = {
  addToCart: addToCart,
  account: '__ACCOUNT',
  environment: 'dev',
  getProductId: getProductByIdCace,
  getProducts: getProductsCace,
  idLivestreaming: '__IDLIVESTREAMING',
  isInGlobalPage: false,
  isInfinite: true,
  kuikpay: false,
  originOfProducts: '_ORIGINOFPRODUCTS',
  redirectTo: false,
  showChat: true,
  showLike: true,
  showQuickView: false,
  showProductsCarousel: false,
  showSidebarProducts: true,
  showViewers: true,
  time: 999999999,
};
