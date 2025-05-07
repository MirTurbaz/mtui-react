import { ISquareIconProps } from './common';
interface ILoadingSpinnerProps extends ISquareIconProps {
    progress?: number;
}
export declare function LoadingSpinner({ className, color, size, progress, }: ILoadingSpinnerProps): import("react/jsx-runtime").JSX.Element;
export {};
