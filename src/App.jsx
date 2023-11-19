import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Create from './components/Create'
import Result from './components/Result'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  )
}

export default App