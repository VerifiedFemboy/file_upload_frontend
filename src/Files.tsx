import React from "react";
import "./App.css"

interface FileObject {
    name: string;
    extension: string;
    url: string;
}

//TODO: Make functional
async function requestGetFiles(): Promise<FileObject[]> {
    const response = await fetch('http://127.0.0.1:8080/files');
    if (!response.ok) {
        throw new Error('Failed to fetch files');
    }
    const data = await response.json();
    return data.files.map((file: any) => ({
        name: file.name,
        extension: file.extention, // Note the typo in "extention"
        url: file.url
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
            <div>
                <ul>
                    {files.map((file) => (
                        <li key={file.name}>
                            <div>
                                <img src={file.url} alt={file.name} width={300} />
                            </div>
                        </li>
                    ))}
                </ul>
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