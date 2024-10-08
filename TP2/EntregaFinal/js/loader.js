showLoader()

function showLoader() {
    document.querySelector("#loading_bar").classList.add("animate_loading_bar");
    let count = 0;

    const loading = setInterval(() => {
        count++;
        if (count <= 100) {
            document.querySelector('#percentaje').innerHTML = count + ' %';
        }
    }, 50)

    setTimeout(() => {
        clearInterval(loading)
        document.querySelector("#loading_bar").classList.remove("animate_loading_bar")
        document.querySelector(".loader").classList.add("invisible")
    }, 5000)
}