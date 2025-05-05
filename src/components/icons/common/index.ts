export const DEFAULT_ICON_COLOR = 'rgba(0, 0, 0, 0.64)';

interface IIconProps {
  /** Цвет иконки */
  color?: string;
  /** Класс svg вектора */
  className?: string;
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
