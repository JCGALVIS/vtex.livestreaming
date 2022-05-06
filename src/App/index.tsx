import { Livestreaming } from '../lib';
import { livestreamingConfig } from './_config';

const App = () => {
  return <Livestreaming {...livestreamingConfig} />;
};

export default App;
