export default function Utilities() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await uploadFile();
    };

    return (
    <form id='upload-form' onSubmit={handleSubmit}>
        <label htmlFor="file-input" id='custom-file-input'>browse</label>
        <input type='file' id='file-input' multiple />
        <button type='submit' id='upload-button'>upload</button>
    </form>
    );
}

async function uploadFile() {
    const input = document.getElementById('file-input') as HTMLInputElement;
    if (input.files === null) {
        return;
    }
    const files = Array.from(input.files);

    if (files.length === 0) {
        alert("No file chosen");
        return;
    }
    
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('file', file);
    });
    const response = await fetch('http://127.0.0.1:8080/upload', {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        alert("Something went wrong with uploading the file");
    }
    alert("File uploaded successfully");
    setTimeout(() => {
        window.location.reload();
    }, 1500);
    input.value = '';
}