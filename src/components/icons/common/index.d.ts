export declare const DEFAULT_ICON_COLOR = "rgba(0, 0, 0, 0.64)";
interface IIconProps {
    /** Класс svg вектора */
    className?: string;
    /** Цвет иконки */
    color?: string;
}
export interface ISquareIconProps extends IIconProps {
    /** Размер иконки в пикселях */
    size?: number;
}
export interface IRectangleIconProps extends IIconProps {
    /** Высота иконки в пикселях */
    height?: number;
    /** Ширина иконки в пикселях */
    width?: number;
}
export {};
