import { useState, useEffect } from "react";
import FileUploader from "./components/fileUploader";
import { useForm } from "@mantine/form";
import { FileInput, TextInput, Button } from "@mantine/core";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    const helper_name = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/get`);

      const result = await res.json();

      setName(result.firstName);

      console.log(res);
    };

    helper_name();
  }, []);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      userId: "",
      video: null,
    },
  });

  return (
    <div>
      <form
        onSubmit={form.onSubmit(async (values) => {
          const formData = new FormData();
          formData.append("video", values.video);
          formData.append("title", values.title);
          formData.append("userId", values.userId);

          try {
            const response = await fetch(
              "http://localhost:3000/videos/upload",
              {
                method: "POST",
                body: formData,
              }
            );

            const result = await response.json();
            console.log("Success:", result);
          } catch (error) {
            console.error("Error:", error);
          }
        })}
      >
        <div>
          <FileInput
            variant="filled"
            label="video"
            accept="video/mp4"
            withAsterisk
            description="Upload your video file here"
            placeholder="Input placeholder"
            key={form.key("video")}
            {...form.getInputProps("video")}
          />
          <TextInput
            label="title"
            placeholder="Enter your title"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
          <TextInput
            label="userId"
            placeholder="Enter your name"
            key={form.key("userId")}
            {...form.getInputProps("userId")}
          />
          <Button type="submit">Post my video!</Button>
        </div>
      </form>
      <h1 className="text-3xl font-bold underline">My name is {name}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
