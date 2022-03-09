import { useEffect, useState, useCallback } from 'react';
import './App.css';
import {createWorker} from 'tesseract.js'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [textResult, setTextResult] = useState('')

  const worker = createWorker()
  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return
    await worker.load()
    await worker.loadLanguage('ind')
    await worker.initialize('ind')
    const {data} = await worker.recognize(selectedImage)
    setTextResult(data.text)
    await worker.terminate();
  }, [worker, selectedImage])

  useEffect(() => {
    convertImageToText()
  }, [selectedImage, convertImageToText])

  const handleChangeImg = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0])
    } else {
      setSelectedImage(null)
      setTextResult('')
    }
  }

  return (
    <div className="container">
      <h1>Image2Text Conversion</h1>
      <div className='input-wrapper'>
        <label htmlFor='upload'>Upload Image</label>
        <input type='file' id='upload' accept='image/*' onChange={handleChangeImg} />
      </div>

      <div className='result'>
        {selectedImage && (
          <div className='box-image'>
            <img src={URL.createObjectURL(selectedImage)} alt='thumbnail' />
          </div>
        )}

        {textResult && (            
          <div className='box-p'>
            <p>{textResult}</p>
          </div>            
        )}
      </div>
    </div>
  );
}

export default App;
