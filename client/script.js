function submitItem() {
    const itemURL = document.querySelector('.item-input').value;
    fetch('http://localhost:3000/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({itemURL})
    })    
}

function newElement(type, attributes={}) {
    const element = document.createElement(type);
    for (let attribute in attributes) {
        const value = attributes[attribute];
        if (attribute == 'innerText') element.innerText = value;
        else element.setAttribute(attribute, value);
    }
    return element;
}

async function loadItem() {
    const result = await fetch('http://localhost:3000/item');
    const item = await result.json();

    const container = document.querySelector('.container');

    const card = newElement('div', {class: 'card'});
    const title = newElement('h4', {innerText: item.name});
    const price = newElement('h4', {innerText: item.price});
    const img = newElement('img', {src: item.img});
    img.style.width = '100px';
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(img);
    container.appendChild(card);

}

loadItem();

