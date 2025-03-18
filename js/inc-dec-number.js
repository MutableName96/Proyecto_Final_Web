document.querySelectorAll('.card-product').forEach(card => {
    const minus = card.querySelector('.minus');
    const num = card.querySelector('.num');
    const plus = card.querySelector('.plus');
    const unitPrice = parseInt(card.querySelector('.price').innerText.replace('$', ''), 10);
    const totalPrice = card.querySelectorAll('.price')[1];

    let i = parseInt(num.innerText, 10);

    plus.addEventListener('click', () => {
        i++;
        i = i < 10 ? "0" + i : i;
        num.innerText = i;
        totalPrice.innerText = `$ ${unitPrice * i}`;
    });
    minus.addEventListener('click', () => {
        if (i > 1) {
            i--;
            i = i < 10 ? "0" + i : i;
            num.innerText = i;
            totalPrice.innerText = `$ ${unitPrice * i}`;
        }
    });
});  