showLoader()

function showLoader() {
    let count = 0;

    const loading = setInterval(() => {
        count++;
        if (count <= 100) {
            document.querySelector('#percentaje').innerHTML = count + ' %';
        }
    }, 50)

    setTimeout(() => {
        clearInterval(loading)
        document.querySelector("#loader_container").classList.add("invisible")
    }, 5000)
}