const tools = document.querySelectorAll('.tool-item');
const canvas = document.getElementById('canvas');
const emptyState = document.querySelector('.empty-state');

// Drag and Drop Logic
tools.forEach(tool => {
    tool.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('type', e.target.getAttribute('data-type'));
    });
});

canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
    canvas.classList.add('drag-over');
});

canvas.addEventListener('dragleave', () => {
    canvas.classList.remove('drag-over');
});

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    canvas.classList.remove('drag-over');
    
    if (emptyState) emptyState.style.display = 'none';

    const type = e.dataTransfer.getData('type');
    const newElement = createElement(type);
    canvas.appendChild(newElement);
});

// Component Creation
function createElement(type) {
    const container = document.createElement('div');
    container.className = 'dropped-item';
    
    let content = '';

    switch(type) {
        case 'navbar':
            content = `
                <nav class="navbar navbar-expand-lg navbar-light bg-light rounded shadow-sm px-3">
                    <a class="navbar-brand" href="#" contenteditable="true">MY BRAND</a>
                    <div class="ms-auto">
                        <ul class="navbar-nav">
                            <li class="nav-item"><a class="nav-link" href="#" contenteditable="true">Home</a></li>
                            <li class="nav-item"><a class="nav-link" href="#" contenteditable="true">Features</a></li>
                        </ul>
                    </div>
                </nav>`;
            break;
        case 'heading':
            content = `<h1 contenteditable="true" class="display-3 fw-bold mt-4">Next Level Title</h1>`;
            break;
        case 'text':
            content = `<p contenteditable="true" class="fs-5 text-muted">Double click this text to start writing your own story. Everything is editable!</p>`;
            break;
        case 'button':
            content = `<div class="py-3"><button class="btn btn-info btn-lg px-5 text-white" contenteditable="true">Get Started</button></div>`;
            break;
        case 'image':
            content = `
                <div class="image-upload-wrapper">
                    <input type="file" accept="image/*" class="d-none" onchange="handleImage(this)">
                    <div class="img-placeholder" onclick="this.previousElementSibling.click()">
                        <span>Click to Upload Image from Gallery</span>
                    </div>
                </div>`;
            break;
        case 'footer':
            content = `
                <footer class="py-5 mt-5 border-top text-center bg-light rounded">
                    <p class="text-muted" contenteditable="true">© 2026 Your Brand Name. All rights reserved.</p>
                </footer>`;
            break;
    }

    container.innerHTML = `
        ${content}
        <button class="delete-btn" title="Remove" onclick="this.parentElement.remove()">×</button>
    `;

    return container;
}

// Logic to handle local image gallery upload
function handleImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const wrapper = input.parentElement;
            wrapper.innerHTML = `<img src="${e.target.result}" class="img-fluid rounded shadow w-100" style="max-height: 500px; object-fit: cover;">`;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function clearCanvas() {
    if(confirm("Clear your website progress?")) {
        canvas.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        canvas.appendChild(emptyState);
    }
}

// Helper to let you see the HTML result in console
function downloadHTML() {
    console.log(canvas.innerHTML);
    alert("Check browser console (F12) for your clean HTML code!");
}