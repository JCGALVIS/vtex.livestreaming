import { lazyLoad } from '../../../utils';

const DesktopControls = lazyLoad(
  () => import('./DesktopControls'),
  module => module.DesktopControls,
  { fallback: <p>Loading DesktopControls...</p> },
);

const MobileControls = lazyLoad(
  () => import('./MobileControls'),
  module => module.MobileControls,
  { fallback: <p>Loading MobileControls...</p> },
);

export { DesktopControls, MobileControls };
