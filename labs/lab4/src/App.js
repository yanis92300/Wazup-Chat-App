import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Channels } from './Components/Channels';
import { Conv } from './Components/Conv';
import { MessageForm } from './Components/MessageForm';

function App() {
  return (
    <div className="App">
      <div className="App-root">
        
       <Header />
       <Footer />
       <Channels />
       <Conv />
       
         
      </div>
    </div>
  );
}

export default App;
