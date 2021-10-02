import AuthonLayout from "layouts/AuthonLayout";
import PrivateLayout from "layouts/PrivateLayout";
import Index from "pages/Index";
import Menu from "pages/Menu/Index";
import Usuarios from "pages/Menu/Usuarios";
import Ventas from "pages/Menu/Ventas";
import Productos from "pages/Menu/Productos";
import Registro from "pages/Registro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={["/menu/ventas", "/menu/productos", "/menu/usuarios"]}>
            <PrivateLayout>
              <Switch>
                <Route path="/menu/ventas">
                  <Ventas />
                </Route>
                <Route path="/menu/productos">
                  <Productos />
                </Route>
                <Route path="/menu/usuarios">
                  <Usuarios />
                </Route>
              </Switch>
            </PrivateLayout>
          </Route>

          <Route path="/menu">
            <Menu />
          </Route>

          <Route path={["/", "/registro"]}>
            <AuthonLayout>
              <Switch>
                <Route path="/registro">
                  <Registro />
                </Route>
                <Route path="/">
                  <Index />
                </Route>
              </Switch>
            </AuthonLayout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
