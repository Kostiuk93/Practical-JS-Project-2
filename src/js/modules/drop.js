import { postData } from "../services/requests";
const drop = () => {
    const fileInputs = document.querySelectorAll('[name=upload]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName,preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highLight(item) {
        item.closest('.file_upload').style.border= "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = '#FF0000';
    };
    function unhighLight(item) {
        item.closest('.file_upload').style.border= "none";
        if (item.closest('.server_form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else if (item.closest('.background_form')) {
            item.closest('.file_upload').style.backgroundColor = '#f7e7e6';
        } else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        }
    };

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName,() => highLight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName,() => unhighLight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

            // Автоматическая отправка изображения на сервер
            if (input.getAttribute('data-upload')) {
                e.preventDefault();
                e.stopPropagation();
                
                let formData = new FormData();
                [...input.files].forEach(file => {
                    formData.append('image', file);
                    postData('assets/server.php', formData)
                        .then(res => {
                            console.log(res);
                        });
                });
            }



            const arr = input.files[0].name.split('.');
            let dots;
            arr[0].length > 5 ? dots = '...' : dots = ".";
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });
};

export default drop;

// события которые происходят при перетаскивании элемента в браузере
// drag * 
// dragend *
// deagenter - объект над dropArea
// dragexit *
// dragleave - объект за пределами dropArea
// dragover - объект зависает над dropArea
// dragstart *
// drop - оъект отправлен в dropArea
// * - срабатывает на перетаскиваемом элементе