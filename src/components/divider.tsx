import * as React from 'react';
import { HTMLAttributes } from 'react';

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  outerPadding?: number;
  marginVertical?: number;
  vertical?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ vertical, outerPadding = 16, marginVertical = 28, ...props }) => {
  const classes = ['divider'];
  classes.push(vertical ? 'divider_vertical' : 'divider_horizontal');
  if (props.className) classes.push(props.className);

  return vertical ? (
    <div
      {...props}
      className={classes.join(' ')}
      style={{
        ...props.style,
        marginTop: marginVertical,
        marginBottom: marginVertical,
        marginLeft: outerPadding,
        marginRight: outerPadding,
      }}
    />
  ) : (
    <div
      {...props}
      className={classes.join(' ')}
      style={{
        ...props.style,
        marginTop: marginVertical,
        marginBottom: marginVertical,
        marginLeft: -outerPadding,
        marginRight: -outerPadding,
        width: `calc(100% + ${outerPadding * 2}px)`,
      }}
    />
  );
};
