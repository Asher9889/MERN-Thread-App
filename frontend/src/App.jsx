import { ContentWrapper, Header, LeftHeader, UserPost} from './components'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { UserPage, PostPage, AuthPage, UpdateProfile} from './pages'
import { useSelector } from 'react-redux'
import './App.css'
import HomePage from './pages/home-page/HomePage'
import { useEffect } from 'react'




function App() {
  
  const user = useSelector((state) => state.loggedUser.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!user){
      navigate("/auth")
    }
  },[user])


 

  return (
    <main className='bg-[var(--black-color)] min-h-screen'>
      <ContentWrapper>
        {/* Header for all routes */}
        {user && <LeftHeader />}
        {!user && <Header />}
          <Routes>
            <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" /> } />
            <Route path="/:username" element={<UserPage /> }></Route>
            <Route path="/:username/post/:pid" element={<PostPage />}></Route>
            <Route path="/update" element={ user ? <UpdateProfile /> : <Navigate to="/auth" />}/>
            <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />}></Route>   
          </Routes>
        
      </ContentWrapper>
    </main>
  )
}

export default App;
