import { ContentWrapper, Header, UserPost} from './components'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserPage, PostPage, AuthPage} from './pages'
import { useSelector } from 'react-redux'
import './App.css'
import HomePage from './pages/home-page/HomePage'
import { useEffect } from 'react'



function App() {
  
  const user = useSelector((state) => state.loggedUser.user)


 

  return (
    <main className='bg-[var(--black-color)] min-h-screen'>
      <ContentWrapper>
        {/* Header for all routes */}
        <Header />
          <Routes>
            <Route path="/" element={user ? <HomePage /> : <Navigate to="/" /> } />
            <Route path="/:username" element={<UserPage />}></Route>
            <Route path="/:username/post/:pid" element={<PostPage />}></Route>
            <Route path="/update" element={ user ? <UpdateProfile /> : <Navigate to="/auth" />}/>
            <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />}></Route>   
          </Routes>
        
      </ContentWrapper>
    </main>
  )
}

export default App;
