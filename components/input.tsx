import classNames from "classnames";
import { useMemo, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({className, ...rest}: InputProps) {
    const classes = useMemo(() => classNames('', className), [className]);
    return <input className={classes} {...rest} />
}