export default function Utilities() {
    return (
    <form id='upload-form'>
        <label htmlFor="file-input" id='custom-file-input'>browse</label>
        <input type='file' id='file-input' multiple />
        <button type='submit' id='upload-button' onClick={uploadFile}>upload</button>
    </form>
    );
}

async function uploadFile() {
    const input = document.getElementById('file-input') as HTMLInputElement;
    if (input.files === null) {
        return;
    }
    const files = Array.from(input.files);
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('file', file);
    });
    const response = await fetch('https://127.0.0.1:8080/upload', {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        alert("Something went wrong with uploading the file");
    }
    input.value = '';
}