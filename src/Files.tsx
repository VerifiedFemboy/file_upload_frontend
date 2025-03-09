import React from "react";
import "./App.css"

interface FileObject {
    name: string;
    size: number;
    type: string;
}

//TODO: Make functional
async function requestGetFiles(): Promise<FileObject[]> {
    const response = await fetch('/api/files');
    if (!response.ok) {
        throw new Error('Failed to fetch files');
    }
    const files: FileObject[] = await response.json();
    return files;
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

    if (files.length === 0) {
        return <div>No files available</div>;
    } else {
        return (
            <div>
                <ul>
                    {files.map((file) => (
                        <li key={file.name}>
                            {file.name} - {file.size} bytes - {file.type}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}