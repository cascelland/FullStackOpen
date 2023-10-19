const Notification = ({ message }) => {
    if (message === '') {
        return null
    }

    return (
        <div class="notification">
            {message}
        </div>
    )
}

export default Notification