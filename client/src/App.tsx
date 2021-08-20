import {Switch,Route} from "react-router-dom";
import Nav from "./components/nav/Nav"
import CodeContextProvider from "./contexts/CodeContextProvider";
import ThemeContextProvider from "./contexts/ThemeContextProvider";
import Home from "./pages/Home";

const App = () => 
{
  return(
    <>
      <ThemeContextProvider>
        <CodeContextProvider>
          <div className="App">
              <Nav/>
              <Switch>
                  <Route exact path='/' component={Home} />
              </Switch>
          </div>
        </CodeContextProvider>
      </ThemeContextProvider>
    </>
  )
}

export default App;
