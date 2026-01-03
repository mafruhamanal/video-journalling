import { FileInput } from '@mantine/core';

 function FileUploader() {
  return (
    <FileInput
    
      variant="filled"
      label="video"
      accept="video/mp4"
      withAsterisk
      description="Upload your video file here"
      error="Upload Required"
      placeholder="Input placeholder"
      key={form}
    />
  );
}

export default FileUploader;
