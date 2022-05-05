import { Feed } from './Feed/Feed';
import { Like } from './Like/Like';
import { Live } from './Live/Live';
import { ProductButton } from './ProductsButton/ProductButton';
import { ProductToCart } from './ProductCart/ProductToCart';
import { ProductVariationButton } from './ProductsButton/ProductVariationButton';
import { Spinner } from './Spinner/Spinner';
import { Viewers } from './Viewers/Viewers';
import { lazyLoad } from '../utils';

const KuikPayButton = lazyLoad(
  () => import('./ProductsButton/KuikPayButton'),
  module => module.KuikPayButton,
  { fallback: <p>Loading KuikPayButton...</p> },
);

const Chat = lazyLoad(
  () => import('./Chat/Chat'),
  module => module.Chat,
  { fallback: <p>Loading Chat...</p> },
);

const HorizontalProductSlider = lazyLoad(
  () => import('./ProductSlider/HorizontalProductSlider'),
  module => module.HorizontalProductSlider,
  { fallback: <p>Loading HorizontalProductSlider...</p> },
);

const SliderProductMobile = lazyLoad(
  () => import('./ProductSlider/SliderProductMobile'),
  module => module.SliderProductMobile,
  { fallback: <p>Loading SliderProductMobile...</p> },
);

const PromotionAnimations = lazyLoad(
  () => import('./PromotionNotification/Animations'),
  module => module.default,
  { fallback: <p>Loading Animations...</p> },
);

const VariationSelector = lazyLoad(
  () => import('./ProductVariationSelector/VariationSelector'),
  module => module.VariationSelector,
  { fallback: <p>Loading VariationSelector...</p> },
);

const VerticalProductSlider = lazyLoad(
  () => import('./ProductSlider/VerticalProductSlider'),
  module => module.VerticalProductSlider,
  { fallback: <p>Loading VerticalProductSlider...</p> },
);

const ButtonProductsMobile = lazyLoad(
  () => import('./ProductSlider/ButtonProductsMobile'),
  module => module.ButtonProductsMobile,
  { fallback: <p>Loading ButtonProductsMobile...</p> },
);

export {
  ButtonProductsMobile,
  Chat,
  Feed,
  HorizontalProductSlider,
  KuikPayButton,
  Like,
  Live,
  ProductButton,
  ProductToCart,
  ProductVariationButton,
  SliderProductMobile,
  VariationSelector,
  Spinner,
  VerticalProductSlider,
  Viewers,
  PromotionAnimations,
};
