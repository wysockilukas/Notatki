

Routing działa jak include
 W url jest jakaś scieżka jest ten url zaczyna się od tego co jest w path
 To komponent jest includowany na stronie 


Bedziemy mogli uzyc routingu we wszysktich komponentach, ktore sa dziecmi BrowserRoute
```javascript
import {BrowserRouter, Route}  from 'react-router-dom';

<BrowserRouter>
  <Route path="/users"    component={Users}/>
  <Route path="/courses"   component={Courses}/>
</BrowserRouter>

<BrowserRouter basename="/posts">  
<div className="App">
  <Blog />
</div> 
</BrowserRouter>
      
      
{/* <Route path="/" render={ () => <h1>Home</h1>}/>  */}
{/* <Route path="/" exact render={ () => <h1>Home</h1>}/>  */}
<Switch>
    <Route path="/new-post"   component = {AsyncNewPost}    /> 
    <Route path="/posts"   component = {Posts}    /> 
    {/* <Redirect from="/xyz" to="/" /> */}
    <Route render = { () => <h1>404</h1>} />
</Switch>      
```

Nawigacja Link i NavLink muszą być wewnątrz BrowserRouter
```javascript
<Link to="/">Home</Link>
<NavLink to="/users">Users</NavLink>
```

Przekazywanie parametrów
np Mamy gdzieś 
```javascript
<Route path="/courses/:id"   component={Course}/>
```
Więc jak w URL mamy /courses/7
to dla komponentu, który jest includowany na podsatwie tego Route, w params będzie parametr id = 7
a dokładnie
```javascript
this.props.match.params.id
```

Redirect
```javascript
<Redirect from="/all-courses" to="/courses" />
```

Propsy Routera dostępne są tylko dla komponentu ktory został bezpośrendio inkludowany routrem,   
czyli tego ktory jest wymieniony w component = {}  
ale mozemy te propsy przekazac w dol, gdy ten zagniezdzony komponent wyeksporuemy jako dziecko HOC  withRouter  
```javascript
import {withRouter} from 'react-router-dom';
export default withRouter(burger);
```

Routing = include z pzrekazaniem propsów  
ale w ten sposób w komponencie ContactData nie będziemy mieć dostępu do propsów Routingu  
```javascript
 <Route 
     path={this.props.match.path + '/contact-data'} 
      render = { () => <ContactData ingredients={this.state.ingredients}/>} 
 />
```
Ale są na to sposoby  
1 to withRouter  
2 kod ponizej
```javascript
render = { (props) => <ContactData ingredients={this.state.ingredients} totalPrice ={this.state.totalPrice} {...props} />} 
```
...props oznacza ze beda pzrekazane w dół wszystkie prospy ktorymi dany komponetn dysponuje  


### lazy loading

```js
const AsyncOrders = asyncComponent( () => {
  return import('./containers/Orders/Orders');
});

const AsyncCheckout= asyncComponent( () => {
  return import('./containers/Checkout/Checkout');
});

```

