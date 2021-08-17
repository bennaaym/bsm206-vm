import {Switch,Route} from "react-router-dom";
import Nav from "./components/nav/Nav"
import ThemeContextProvider from "./contexts/ThemeContextProvider";
import Home from "./pages/Home";

const App = () => 
{
  return(
    <>
      <ThemeContextProvider>
        <div className="App">
            <Nav/>
            <Switch>
                <Route exact path='/' component={Home} />
            </Switch>
        </div>
      </ThemeContextProvider>
    </>
  )
}

export default App;
