import classNames from 'classnames';
import { useMemo, type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({ className, ...rest }: CardProps) {
  const classes = useMemo(() => classNames('max-w-2xl p-6 bg-white rounded-xl flex gap-4 flex-col md:flex-row', className), [className]);
  return <div className={classes} {...rest} />;
}
