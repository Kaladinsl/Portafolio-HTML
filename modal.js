const closeBtn = document.querySelectorAll('[data-btn-close]');
const closeModalBtn = document.querySelectorAll('[data-cancel-btn]');
const closePageBtn = document.querySelector('[data-close-btn]');
const overlay = document.getElementById('overlay');

const screen = document.getElementById('screen');
const background = document.getElementById('taskbar');
const portfolioIcon = document.querySelector('[data-icon-portfolio]');

const minimizeBtn = document.querySelector('[data-minimize]');
const maximizeBtn = document.querySelector('[data-maximize]');

closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const modal = document.querySelector(btn.dataset.btnClose);
        openModal(modal);
    });
});

closeModalBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        closeModal(modal);
    });
});

closePageBtn.addEventListener('click', () => {
    if (screen.classList[0] === 'screen') {
        screen.style.display = 'none';
    }
});

function openModal(modal) {
    if (modal == null) return;

    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;

    modal.classList.remove('active');
    overlay.classList.remove('active');
}

minimizeBtn.addEventListener('click', () => {
    screen.classList.add('minimized');
    background.classList.add('active');
    document.body.classList.add('active');
});

maximizeBtn.addEventListener('click', () => {
    screen.classList.toggle('windowed');
});

portfolioIcon.addEventListener('click', () => {
    if (screen.style.display == 'none') {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        screen.style.display = 'flex';
        return;
    }

    screen.classList.toggle('minimized');
    background.classList.toggle('active');
    document.body.classList.toggle('active');
});
