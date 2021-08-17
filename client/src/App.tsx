import Nav from "./components/nav/Nav"
import ThemeContextProvider from "./contexts/ThemeContextProvider";

const App = () => 
{
  return(
    <>
      <ThemeContextProvider>
        <div className="App">
            <Nav/>
        </div>
      </ThemeContextProvider>
    </>
  )
}

export default App;
