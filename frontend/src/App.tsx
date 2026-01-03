import { useState, useEffect } from "react";
import FileUploader from "./components/fileUploader";

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    const helper_name = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/get`);
      const result = await res.json();
      setName(result.firstName);
    };
    helper_name();
  }, []);

  return (
    <FileUploader/>
  )
}

export default App;