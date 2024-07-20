import { ContentWrapper, Header, UserPost} from './components'
import { Routes, Route } from 'react-router-dom'
import { UserPage, PostPage } from './pages'
import './App.css'



function App() {
  

  return (
    <main className='bg-[var(--black-color)]'>
      <ContentWrapper>
        <Header />
          <Routes>

            <Route path="/:username" element={<UserPage />}></Route>
            <Route path="/:username/post/:pid" element={<PostPage />}></Route>
            <Route path="/exp" element={<UserPost />}></Route>   
          </Routes>
        
      </ContentWrapper>
    </main>
  )
}

export default App;
