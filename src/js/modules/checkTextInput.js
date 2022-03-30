const checkTextInput = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        // Ввод в интут только кирилицей и цифрами
        input.addEventListener('keypress', function(e) {
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }

        // Удаляет автозаполнение инпута латиницей
        input.addEventListener('input', () => {
            if (input.value.match(/[a-z]/ig)) {
                input.value = '';
            }
            });
        });
    });
};

export default checkTextInput;