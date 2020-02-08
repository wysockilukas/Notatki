


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
