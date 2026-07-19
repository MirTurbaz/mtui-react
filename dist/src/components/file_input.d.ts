import * as React from 'react';
export interface FileInputProps {
    className?: string;
    value?: any[] | null;
    onChange: (value: any) => void;
    accept?: string;
}
export declare const FileInput: React.FC<FileInputProps>;
