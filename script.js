let theGender = undefined;

// STEP 1

document.getElementById('btn-male').addEventListener('click', (event) => {
    document.getElementById('the-output').value += '\r\n\r\n';
    document.getElementById('the-output').value += ' בן';
    theGender = 'male';
    clearCard();
    let tempElement = document.createElement('div');
    tempElement.innerHTML = "גיל";
    tempElement.classList.add('current-title');
    document.getElementById('main-card').appendChild(tempElement);
    tempElement = document.createElement('input');
    tempElement.classList.add('field-lg');
    tempElement.id = 'current-field';
    document.getElementById('main-card').style.flexDirection = 'column';
    document.getElementById('main-card').style.justifyContent = 'space-between';
    document.getElementById('main-card').style.padding = '20% 0px 20% 0px';
    document.getElementById('main-card').appendChild(tempElement);
    document.getElementById('current-field').focus();
});

document.getElementById('btn-fe male').addEventListener('click', (event) => {
    document.getElementById('the-output').value += '\r\n\r\n';
    document.getElementById('the-output').value += ' בת';
});

function clearCard() {
    document.getElementById('main-card').textContent = '';
}

