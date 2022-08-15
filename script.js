const textarea = document.querySelector('textarea');
const input = document.querySelector('.input');
const section = document.querySelector('.cmd');
const projectsFolder = document.querySelector('.projects-folder');
const project = document.querySelector('.project');
const mobileBtn = document.querySelector('[data-mobile-button]');

const helpTable = [
  `
  <p>Here's a list of available commands:</p>
  <br>
  <table class='cmds-table'>
    <tr>
      <td>
        cat README.md
      </td>
      <td>
        Displays info about myself
      </td>
    </tr>
    <tr>
      <td>
        start projects
      </td>
      <td>
        Opens the projects folder
      </td>
    </tr>
    <tr>
      <td>
        cd github
      </td>
      <td>
        Opens my github profile
      </td>
    </tr>
    <tr>
      <td>
        exit
      </td>
      <td>
        Goes to a more visual interface
      </td>
    </tr>
    <tr>
      <td>
        cd contact
      </td>
      <td>
        Opens a contact form
      </td>
    </tr>
    <tr>
      <td>
        start "" resume.pdf
      </td>
      <td>
        Opens resume in a new tab
      </td>
    </tr>
  </table>
  <br>
`,
];
const cmdsHistory = [];
const directory = ['projects/', 'README.md', 'resume.pdf', 'github', 'contact'];

function textAreaAdjust(element) {
  element.style.height = '1px';
  element.style.height = element.scrollHeight + 'px';
}

function createNewLine(value) {
  const newInput = document.createElement('div');
  newInput.classList.add('output');
  newInput.innerHTML = `
    <span>root@localhost<span>~#</span></span>
    <p>$ ${value}</p>
  `;
  section.insertBefore(newInput, input);
}

function storeCmds(value) {
  if (value === '') return;
  cmdsHistory.push(value);
}

function returnedData(value) {
  if (value === '') {
    const newReturn = document.createElement('div');
    newReturn.classList.add('return');
    newReturn.innerHTML = '$';
    section.insertBefore(newReturn, input);
    return;
  }

  if (value === 'help') {
    const newReturn = document.createElement('div');
    newReturn.classList.add('return');
    newReturn.innerHTML = helpTable[0];
    section.insertBefore(newReturn, input);
    return;
  }

  if (value === 'ls') {
    const newReturn = document.createElement('div');
    newReturn.classList.add('return');
    newReturn.innerHTML = `
      <p>${directory
        .map((e) => {
          return `${e}&nbsp;&nbsp;`;
        })
        .join('')}</p>
    `;
    section.insertBefore(newReturn, input);
    return;
  }

  if (value === 'start projects') {
    const newReturn = document.createElement('div');
    newReturn.classList.add('return');
    newReturn.innerHTML = 'start projects';
    section.insertBefore(newReturn, input);

    projectsFolder.style.transform = 'scale(1)';
    return;
  }

  if (value === 'start "" resume.pdf') {
    const newReturn = document.createElement('div');
    newReturn.classList.add('return');
    newReturn.innerHTML = 'start "" resume.pdf';
    section.insertBefore(newReturn, input);
    window.open('./resume.pdf');
    return;
  }

  if (value == 'cat README.md') {
    const newReturn = document.createElement('div');
    newReturn.classList.add('return');
    newReturn.innerHTML = `
      <p>Hello! My name is Pedro, I'm a Front-End Developer.</p>
      <p>Here you can check all of the projects I've made during this
      journey of becoming a better web developer
      (there's also a mobile app!).</p>
      <br>
      <p>Type 'help' if you want to know more about the available commands</p>
      <p>Type 'exit' to go to a more visual webpage</p>
    `;
    section.insertBefore(newReturn, input);
    return;
  }

  if (value === 'exit') {
    const newReturn = document.createElement('div');
    newReturn.classList.add('return');
    newReturn.innerHTML = 'logout';
    section.insertBefore(newReturn, input);

    input.style.display = 'none';
    setTimeout(() => window.open('projects.html'), 300);

    return;
  }

  if (value === 'cd contact') {
    const newReturn = document.createElement('div');
    newReturn.classList.add('return');
    newReturn.innerHTML = 'redirecting';
    section.insertBefore(newReturn, input);

    setTimeout(() => window.open('contact.html'), 300);

    return;
  }

  if (value === 'cd github') {
    const newReturn = document.createElement('div');
    newReturn.classList.add('return');
    newReturn.innerHTML = 'redirecting to github';
    section.insertBefore(newReturn, input);

    setTimeout(() => window.open('https://github.com/pedrolampo'), 300);

    return;
  }

  // TODO: MAKE CHANGE DIR POSIBLE
  if (value.split(/\s/)[0].split(/\s/).includes('cd')) {
    const errorReturn = document.createElement('div');
    errorReturn.classList.add('return');
    errorReturn.innerHTML = `
      <p>fatal: cannot change directory</p>
    `;
    section.insertBefore(errorReturn, input);
    return;
  }

  const errorReturn = document.createElement('div');
  errorReturn.classList.add('return');
  errorReturn.innerHTML = `
    <p>bash: ${value}: command not found</p>
  `;
  section.insertBefore(errorReturn, input);
  return;
}

function submitCommand() {
  let cmdIndex = 0;

  mobileBtn.addEventListener('click', (e) => {
    e.preventDefault();

    createNewLine(textarea.value);
    returnedData(textarea.value);
    storeCmds(textarea.value);

    textarea.value = '';
  });

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      createNewLine(textarea.value);
      returnedData(textarea.value);
      storeCmds(textarea.value);

      textarea.value = '';
    }

    if (e.key === 'ArrowUp' && cmdsHistory.length != 0) {
      if (cmdIndex === 0) {
        textarea.value = cmdsHistory[0];
        return;
      }
      cmdIndex -= 1;
      textarea.value = cmdsHistory[cmdIndex];
    }

    if (e.key === 'ArrowDown' && cmdsHistory.length != 0) {
      if (cmdIndex === cmdsHistory.length - 1) {
        textarea.value = cmdsHistory[cmdsHistory.length - 1];
        return;
      }
      cmdIndex += 1;
      textarea.value = cmdsHistory[cmdIndex];
    }
  });

  document.querySelector('.close-btn').addEventListener('click', () => {
    projectsFolder.style.transform = 'scale(0)';
  });
}

submitCommand();

project.addEventListener('dblclick', () => {
  project.classList.toggle('large');
});
