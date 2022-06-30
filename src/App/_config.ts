import { LivestreamingProps } from '../typings/livestreaming';
import { addToCart, getProductByIdCace, getProductsCace } from './helpers';

export const livestreamingConfig: LivestreamingProps = {
  addToCart: addToCart,
  account: 'plataforma',
  environment: 'dev',
  getProductId: getProductByIdCace,
  getProducts: getProductsCace,
  idLivestreaming: 'df8a5bc4-b11c-48bb-90b2-4edd4afdc27b',
  isInGlobalPage: false,
  isInfinite: true,
  kuikpay: false,
  originOfProducts: 'globalPage',
  redirectTo: false,
  showChat: true,
  showLike: true,
  showQuickView: false,
  showProductsCarousel: false,
  showSidebarProducts: true,
  showViewers: true,
  time: 999999999,
};
