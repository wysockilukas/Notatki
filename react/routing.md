

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
export default <withRouter>burger</withRouter>;
```





