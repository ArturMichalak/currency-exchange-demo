interface ErrorProps {
    errorMessage: string
}

export default function Error({errorMessage}: ErrorProps) {
    return <div className="p-2 text-red-500">{errorMessage}</div>
}