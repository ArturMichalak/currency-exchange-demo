import classNames from 'classnames';
import { useMemo, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, ...rest }: ButtonProps) {
  const classes = useMemo(() => classNames('', className), [className]);
  return <button className={classes} {...rest} />;
}
