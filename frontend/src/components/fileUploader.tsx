import { useForm } from "@mantine/form";
import { FileInput, TextInput, Button } from "@mantine/core";

function FileUploader() {

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      userId: "",
      video: null,
    },
    validate: {
      video: (value) => (value ? null : 'Video file is required'),
      title: (value) => (value.trim() ? null : 'Title is required'),
      userId: (value) => (value.trim() ? null : 'User ID is required'),
    },
  });

  return (
    <div className="min-h-screen bg-zinc-900 text-white">

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-normal mb-2">Upload Your Video</h2>
          <p className="text-zinc-400 text-sm">Share your moment with the community</p>
        </div>

        <form
          onSubmit={form.onSubmit(async (values) => {
            if (!values.video) {
              console.error('No video file selected boohoo');
              return;
            }

            const formData = new FormData();
            formData.append('video', values.video);
            formData.append('title', values.title);
            formData.append('userId', values.userId);
            
            try {
              const response = await fetch('http://localhost:3000/videos/upload', {
                method: 'POST',
                body: formData,
              });
              const result = await response.json();
            } catch (error) {
              console.error('Error:', error);
            }
          })}
          className="space-y-6"
        >
          <FileInput
            label="Video"
            placeholder="Select video file"
            accept="video/mp4"
            description="MP4 format only"
            key={form.key("video")}
            {...form.getInputProps('video')}
            classNames={{
              input: 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500',
              label: 'text-white font-normal mb-2',
              description: 'text-zinc-400 text-sm mt-1',
              error: 'text-orange-500 text-sm mt-1',
            }}
          />

          <TextInput
            label="Title"
            placeholder="Enter your video title"
            key={form.key("title")}
            {...form.getInputProps("title")}
            classNames={{
              input: 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500',
              label: 'text-white font-normal mb-2',
              error: 'text-orange-500 text-sm mt-1',
            }}
          />

          <TextInput
            label="Your Name"
            placeholder="Enter your name"
            key={form.key("userId")}
            {...form.getInputProps("userId")}
            classNames={{
              input: 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500',
              label: 'text-white font-normal mb-2',
              error: 'text-orange-500 text-sm mt-1',
            }}
          />

          <Button 
            type="submit" 
            size="md"
            className="w-full bg-orange-500 hover:bg-orange-700 text-white font-normal"
          >
            Upload Video
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FileUploader;
