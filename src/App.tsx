import './App.css'
import FilesContent from './Files'

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
          <form id='upload-form'>
            <label htmlFor="file-input" id='custom-file-input'>browse</label>
            <input type='file' id='file-input' />
            <button type='submit' id='upload-button'>upload</button>
          </form>
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
