import AuthonLayout from "layouts/AuthonLayout";
import Index from "pages/Index";
import Menu from "pages/Menu/Menu";
import Usuarios from "pages/Menu/Usuarios";
import Ventas from 'pages/Menu/Ventas'
import Registro from "pages/Registro"
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import 'styles/App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/menu/usuarios">
            <Usuarios/>
          </Route>
          <Route path='/menu/ventas'>
            <Ventas/>
          </Route>
          <Route path="/menu">
            <Menu/>
          </Route>
          <AuthonLayout>
            <Route path="/registro">
              <Registro />
            </Route>
            <Route path="/">
              <Index />
            </Route>
          </AuthonLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
