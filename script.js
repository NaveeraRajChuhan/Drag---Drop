const tools = document.querySelectorAll('.tool-item');
const canvas = document.getElementById('canvas');
const emptyState = document.querySelector('.empty-state');

// Drag Start: Identify what is being dragged
tools.forEach(tool => {
    tool.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('type', e.target.getAttribute('data-type'));
    });
});

// Drag Over: Necessary to allow dropping
canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
    canvas.classList.add('drag-over');
});

canvas.addEventListener('dragleave', () => {
    canvas.classList.remove('drag-over');
});

// Drop Event: Build the element
canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    canvas.classList.remove('drag-over');
    
    // Hide empty state on first drop
    if (emptyState) emptyState.style.display = 'none';

    const type = e.dataTransfer.getData('type');
    const newElement = createElement(type);
    canvas.appendChild(newElement);
});

function createElement(type) {
    const container = document.createElement('div');
    container.className = 'dropped-item';
    
    let content = '';

    switch(type) {
        case 'heading':
            content = `<h1 contenteditable="true" class="display-4">New Heading</h1>`;
            break;
        case 'text':
            content = `<p contenteditable="true" class="lead text-secondary">Click here to edit this text. You can write anything you want to build your site.</p>`;
            break;
        case 'button':
            content = `<button class="btn btn-primary btn-lg shadow-sm" contenteditable="true">Click Me</button>`;
            break;
        case 'image':
            content = `<img src="https://via.placeholder.com/600x300" class="img-fluid rounded shadow" alt="placeholder">`;
            break;
    }

    container.innerHTML = `
        ${content}
        <button class="delete-btn" onclick="this.parentElement.remove()">×</button>
    `;

    return container;
}

function clearCanvas() {
    if(confirm("Are you sure you want to delete everything?")) {
        canvas.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        canvas.appendChild(emptyState);
    }
}