function addToList() {
    let input = document.getElementById('textbox').value;
    if (input === '') {
        return;
    }
    const output = document.getElementById('output');
    let newDiv = document.createElement('div');
    let newInput = document.createElement('input');
    let checkButton = document.createElement('button');
    let editButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    newDiv.classList.add('box');
    checkButton.classList.add('unchecked');
    checkButton.classList.add('checkButton');
    editButton.classList.add('button');
    //editButton.classList.add('edit');
    deleteButton.classList.add('button');
    newInput.classList.add('item');
    newInput.setAttribute('type', 'text');
    newInput.value = input;
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    editButton.innerHTML = '<i class="fa-solid fa-pen">';//'</i><i class="fa-solid fa-check closed"></i>';
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    newInput.setAttribute('readonly', true);

    console.log(newInput);

    checkButton.addEventListener('click', () => {
        let listItem = checkButton.nextElementSibling;
        let otherButton = listItem.nextElementSibling;
        let thisBox = checkButton.parentElement;
        if (checkButton.classList.contains('unchecked')) {
            checkButton.classList.remove('unchecked');
            checkButton.classList.add('checked');
        } else {
            checkButton.classList.remove('checked');
            checkButton.classList.add('unchecked');
        }

        if (!listItem.classList.contains('line-through')) {
            listItem.removeAttribute('readonly');
            listItem.classList.add('line-through');
            listItem.setAttribute('readonly', true);
        } else {
            listItem.removeAttribute('readonly');
            listItem.classList.remove('line-through');
            listItem.setAttribute('readonly', true);
        }

        if (!thisBox.classList.contains('greyed')) {
            thisBox.classList.add('greyed');
        } else {
            thisBox.classList.remove('greyed');
        }

        if (!otherButton.classList.contains('noEdit')) {
            otherButton.classList.add('noEdit');
            otherButton.classList.remove('active');
            if (otherButton.querySelector('.fa-check')) {
                otherButton.querySelector('.fa-solid').classList.remove('fa-check');
                otherButton.querySelector('.fa-solid').classList.add('fa-pen');
            }
        } else {
            otherButton.classList.remove('noEdit');
        }
    });

    editButton.addEventListener('click', () => {
        let listItem = editButton.previousElementSibling;
        if (editButton.classList.contains('noEdit')) {
            return;
        } else if (!editButton.classList.contains('active')) {
            editButton.classList.add('active');
            listItem.removeAttribute('readonly');
            listItem.focus();
        } else {
            editButton.classList.remove('active');
            listItem.setAttribute('readonly', true);
        }

        if (editButton.querySelector('.fa-pen')) {
            editButton.querySelector('.fa-pen').classList.remove('fa-pen');
            editButton.querySelector('.fa-solid').classList.add('fa-check');
        } else if (editButton.querySelector('.fa-check')) {
            editButton.querySelector('.fa-check').classList.remove('fa-check');
            editButton.querySelector('.fa-solid').classList.add('fa-pen');
        }
    });

    deleteButton.addEventListener('click', () => {
        deleteButton.parentElement.remove();
    });

    newDiv.append(checkButton, newInput, editButton, deleteButton);
    output.append(newDiv);
}


(function () {
    document.getElementById('add').addEventListener('click', () => {
        addToList();
        document.getElementById('textbox').value = '';
    });

    document.getElementById('textbox').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addToList();
            document.getElementById('textbox').value = '';
        }
    });
})()