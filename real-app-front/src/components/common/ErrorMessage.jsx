

function ErrorMessage({ message, isValid }) {
    return (
        <div>
            {message ? <p>{message}</p> : null}
            {isValid ? <span>✅</span> : <span>❌</span>}
        </div>
    )
}

export default ErrorMessage
