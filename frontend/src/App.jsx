import { ContentWrapper, Header, UserPost} from './components'
import { Routes, Route } from 'react-router-dom'
import { UserPage, PostPage, AuthPage } from './pages'
import './App.css'



function App() {
  

  return (
    <main className='bg-[var(--black-color)] min-h-screen'>
      <ContentWrapper>
        {/* Header for all routes */}
        <Header />
          <Routes>

            <Route path="/:username" element={<UserPage />}></Route>
            <Route path="/:username/post/:pid" element={<PostPage />}></Route>
            <Route path="/auth" element={<AuthPage />}></Route>   
          </Routes>
        
      </ContentWrapper>
    </main>
  )
}

export default App;
