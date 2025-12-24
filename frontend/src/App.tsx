import { useState, useEffect} from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect( () => {

    const helper_name = async () => {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/get`);

      const result = await res.json();

      setName(result.firstName);
      
      console.log(res);
      
    }

    helper_name();

  },  [])

  return (
    <div>
        {/* <form action="/stats" enctype="multipart/form-data" method="post">
          <div>
            <input type="file" name="video">
            <input type="text" placeholder="your name" name="userId">
            <input type="submit" value="Post my video!">
          </div>
        </form> */}

        <form action="http://localhost:3000/videos/upload" encType='multipart/form-data' method='post'>
          
          <div>
            <input type="file" name="video"/>
            <input type="text" placeholder="enter your title" name="title"/>
            <input type="text" placeholder="enter your name" name="userId"/>
            <input type="submit" value="Post my video!"/>
          </div>

        </form>
        <h1 className='text-3xl font-bold underline'>My name is {name}</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
    </div>
  )
}

export default App
