import {AuthonLayout as AuthonLayout}from "layouts/AuthonLayout";
import {PrivateLayout as PrivateLayout}from "layouts/PrivateLayout";
import {Index as Index} from "pages/Index";
import {Menu as Menu}from "pages/Menu/Index";
import {Usuarios as Usuarios}from "pages/Menu/Usuarios";
import {Ventas as Ventas}from 'pages/Menu/Ventas'
import {Productos as Productos}from "pages/Menu/Productos";
import {Registro as Registro}from "pages/Registro"
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import 'styles/App.css'


function App() {
  return (
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
    
  );
}

export default App;
