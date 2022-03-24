const closeBtn = document.querySelectorAll('[data-btn-close]');
const closeModalBtn = document.querySelectorAll('[data-cancel-btn]');
const closePageBtn = document.querySelector('[data-close-btn]');
const overlay = document.getElementById('overlay');

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

closePageBtn.addEventListener('click', () => window.close());

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

minimizeBtn.addEventListener('click', () =>
    document.body.classList.add('minimized')
);

maximizeBtn.addEventListener('click', () =>
    document.body.classList.remove('minimized')
);
