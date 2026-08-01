import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './assets/Pages/Home';
import SignUp from './assets/Pages/SignUp';
import Login from './assets/Pages/Login';
import Post from './assets/Pages/Post';
import ViewPost from './assets/Pages/ViewPost';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<Home />} />
           <Route path='/signup' element={<SignUp />} />
           <Route path='/login' element={<Login />} />
           <Route path='/post' element={<Post />} />
           <Route path='/viewpost' element={<ViewPost />} />
         </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
