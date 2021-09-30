import AuthonLayout from "layouts/AuthonLayout";
import Index from "pages/Index";
import Menu from "pages/Menu";
import Registro from "pages/Registro"
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import 'styles/App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
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
