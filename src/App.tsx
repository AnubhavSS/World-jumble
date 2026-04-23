import Home from './pages/Home'
import {Switch,Route} from 'wouter'
import Game from './pages/Game'
function App() {

  return (
    <Switch>
     <Route path="/" component={Home} />
     <Route path="/game" component={Game} />
    </Switch>
  )
}

export default App
