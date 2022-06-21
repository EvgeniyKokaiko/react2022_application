import React from "react";
import NavBar from "./components/NavBar";
import { Route } from "react-router-dom";
import NewItem from "./components/NewItem";
import ItemsList from "./components/ItemsList";
import ItemDetail from "./components/ItemDetail";
import Auth from "./components/Auth";
import Register from "./components/Register";
import {currentUser} from "./business/CurrentUser";

interface IState {}
interface IProps {}

class App extends React.Component<IProps, IState> {
    private readonly navBarRef: React.RefObject<any>;
    constructor(props: IProps) {
        super(props);
        this.navBarRef = React.createRef<any>();
    }


    render = () => {
    return (
      <div>
        <NavBar ref={this.navBarRef} />
        <Route path="/" exact render={(route) => <ItemsList {...route} />} />
        <Route path="/items/:post_hash" exact render={(route) => <ItemDetail {...route} />} />
        <Route path="/new" exact render={(route) => <NewItem {...route} />} />
        <Route path="/change/:id" exact render={(route) => <NewItem {...route} />} />
        <Route path="/auth" exact render={(route) => <Auth updateHeader={this.navBarRef} {...route} />} />
        <Route path="/register" exact render={(route) => <Register updateHeader={this.navBarRef} {...route} />} />
      </div>
    );
  }
}

export default App;
