import {Link} from 'react-router-dom'

import './Home.css'
const Home = () => {
  return (
    <div className="Home">
        <h1 className="title">Dashtoon Comic Generator</h1>
        <p>This web application is used to generate comic images based on the prompts provided by the user. The user can provide the prompts in the form of text and speech bubbles. This used <span> Huggin&lsquo;s Face API for image generation</span>
        </p>
        <Link to="/create" className="create-comic">Create Comic</Link>
    </div>
  )
}

export default Home