import './index.less';
interface typeProps {}
import { getName } from './util';

const App = (props: typeProps) => {
  return <div className='container'>test {getName({})}</div>;
};

export default App;
