import AuthonLayout from "layouts/AuthonLayout";
import PrivateLayout from "layouts/PrivateLayout";
import Index from "pages/Index";
import Menu from "pages/menu/Index";
import Usuarios from "pages/menu/Usuarios";
import Ventas from 'pages/menu/Ventas'
import Productos from "pages/menu/Productos";
import Registro from "pages/Registro"
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import 'styles/App.css'
import {Auth0Provider} from '@auth0/auth0-react';


function App() {
  return (
    <Auth0Provider
    domain="misiontic-pioneros.us.auth0.com"
    clientId="8Vf9BqBSBYxyXBk6nXhsewnZdwzHyGIL"
    redirectUri="http://localhost:3000/menu"
    audience='Backend-Api-Autenticacion-Pioneros-Misiontic'
    >
      <div className="App">
        <Router>
          <Switch>
            <Route path={["/menu","/menu/ventas","/menu/productos","/menu/usuarios"]}>
                <PrivateLayout>
                  <Switch>              
                        <Route path="/menu/ventas">
                          <Ventas/>
                        </Route>
                        <Route path="/menu/productos">
                          <Productos/>
                        </Route>
                        <Route path="/menu/usuarios">
                          <Usuarios/>
                        </Route>
                        <Route path="/">
                          <Menu/>
                        </Route>
                  </Switch>
                </PrivateLayout>
            </Route>
                                      
            
            <Route path={["/","/registro"]}>
              <AuthonLayout>
                <Switch>
                  <Route path="/registro">
                    <Registro/>  
                  </Route>
                  <Route path="/">
                    <Index/>
                  </Route>
                </Switch>
              </AuthonLayout>
            </Route>       
        </Switch>
      </Router>
      </div>
    </Auth0Provider>   
    
  );
}

export default App;
