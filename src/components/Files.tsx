import React from "react";
import "../App.css"
import "./Files.css"

interface FileObject {
    name: string;
    extension: string;
    url: string;
    size: number;
}

async function requestGetFiles(): Promise<FileObject[]> {
    const response = await fetch('http://127.0.0.1:8080/files');
    if (!response.ok) {
        throw new Error('Failed to fetch files');
    }
    const data = await response.json();
    return data.files.map((file: any) => ({
        name: file.name,
        extension: file.extention, // Note the typo in "extention"
        url: file.url,
        size: file.size
    }));
}

export default function FilesContent() {
    const [files, setFiles] = React.useState<FileObject[]>([]);

    React.useEffect(() => {
        async function fetchFiles() {
            try {
                const files = await requestGetFiles();
                setFiles(files);
            } catch (error) {
                console.error(error);
            }
        }
        fetchFiles();
    }, []);

    if (files.length > 0) {
        return (
            <div id="files">
                {files.map((file) => (
                    <div id="file" key={file.name}>
                        {(() => {
                            switch (file.extension) {
                                case 'jpg':
                                case 'jpeg':
                                case 'gif':
                                case 'png':
                                case 'webp':
                                    return <img src={file.url} alt={file.name} width={300} />;
                                default:
                                    return <img src="src/assets/txt.png" alt="text file logo" width={300} />;
                            }
                        })()}
                        <div id="info_and_btn">
                            <div id="file-info">
                                <h2>{file.name}</h2>
                                <h3>size: {convertFileSize(file.size)}</h3>
                            </div>
                            <button id="delete-btn" onClick={() => deleteFile(file.name)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <p>No files found</p>
            </div>
        );
    }
}

function convertFileSize(size: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
}

async function deleteFile(file: string) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/file/${file}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete file');
        } else {
            alert("Successfully deleted the file");
        }
    } catch (error) {
        console.error(error);
    }
}
