function submitChannel() {
    const channelURL = document.querySelector('.channel-input').value;
    fetch('http://localhost:3000/creators', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({channelURL})
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

async function loadCreators() {
    const result = await fetch('http://localhost:3000/creators');
    const creators = await result.json();

    const container = document.querySelector('.container');

    creators.forEach(creator => {
        const card = newElement('div', {class: 'card'});
        const title = newElement('h4', {innerText: creator.name});
        const img = newElement('img', {src: creator.img});
        img.style.width = '100px';
        card.appendChild(title);
        card.appendChild(img);
        container.appendChild(card);
    })
}

loadCreators();

