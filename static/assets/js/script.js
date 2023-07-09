clickboardInput.onclick = () => {
    navigator.clipboard.writeText(clickboardInput.value)
    successMessage.classList.add('active')
    setTimeout(() => successMessage.classList.remove('active'), 2000)
}