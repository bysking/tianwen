// import "./App.css";
import lessStyles from '@/App.less';
import imageWord from '@/assets/map.jpg';

function App() {
  const logFn = (count: number) => {
    /** 34 */

    return count + 1;
  };
  logFn(2);
  return (
    <h2>
      222 Hello East_White
      <div className={lessStyles.bysking}>34</div>
      <img width={300} src={imageWord} alt='imageWord' />
    </h2>
  );
}

export default App;
