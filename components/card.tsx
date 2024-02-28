import classNames from 'classnames';
import { createElement, useMemo, type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tag?: keyof JSX.IntrinsicElements;
}

export default function Card({ className, tag, children, ...rest }: CardProps) {
  const classes = useMemo(
    () => classNames('max-w-2xl p-6 bg-white rounded-xl flex gap-4 flex-col md:flex-row', className),
    [className],
  );
  return createElement(tag || 'div', { className: classes, ...rest }, children);
}
