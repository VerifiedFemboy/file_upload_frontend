import './App.css'
import FilesContent from './components/Files'
import Utilities from './components/Utilities'

function App() {

  return (
    <>
      <div id='banner'>
        <h1>File Uploader</h1>
        <h6>:3</h6>
      </div>
      <div id='main'>
        <div id='content'>
          <h1>Your uploads</h1>
          <div id='uploads'>
            <FilesContent/>
          </div>
          <h2>Upload a file</h2>
          <Utilities/>
        </div>
      </div>
      <div id="footer">
        <p>Created by <a href="
        https://github.com/VerifiedFemboy"><i>VerifiedFemboy</i></a></p>
      </div>
    </>
  )
}

export default App
