import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzonePhotosProps {
  label: string;
  onDrop: (newValue: File | null) => void; 
}

function DropzonePhotos({ label, onDrop }: DropzonePhotosProps) {
  const [acceptedFile, setAcceptedFile] = useState<File | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      console.log('File dropped:', files[0]);
      const file = files[0] || null; 
      setAcceptedFile(file);
      onDrop(file);  
    },
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.webp']
    }
  });

  // Display the accepted file
  const filePreview = acceptedFile ? (
    <img
      src={URL.createObjectURL(acceptedFile)}
      onLoad={() => { URL.revokeObjectURL(URL.createObjectURL(acceptedFile)); }} 
      className="block w-auto h-auto max-w-[300px] max-h-[200px]"
      alt="preview"
    />
  ) : null;

  return (
    <section className="container p-4">
      <div {...getRootProps({ className: 'dropzone border-dashed border-2 border-gray-400 p-4 text-center cursor-pointer' })}>
        <input {...getInputProps()} />
        <p>{label}</p>
      </div>
      <aside className="mt-2 text-center">
        <div>{filePreview}</div>
      </aside>
    </section>
  );
}

export default DropzonePhotos;
