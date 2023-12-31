const orderManagement = () => {
    location.href = '/All'
}

const productManagement = () => {
    location.href = '/productManagement'
}

const appendProduct = () => {
    location.href = '/appendProduct'
}

const usersXl = () => {
    fetch('/usersXL')
        .then(res => res.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'users.xlsx';
            a.click();
        })
        .catch((err) => {
            console.log(err);
        })
}