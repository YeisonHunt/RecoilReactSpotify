
import { RecoilRoot } from 'recoil';
import './App.css';
import Routes from "./routes"
import DebugObserver from './components/DebugObserver'

function App() {
  return (
    <RecoilRoot>
      <DebugObserver />

      <Routes />
    </RecoilRoot>
  );
}

export default App;
