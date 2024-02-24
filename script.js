// Function to handle language selection
function selectLanguage(language) {
  const languageIcons = document.querySelectorAll('.language-icons i');
  languageIcons.forEach(icon => {
    icon.classList.remove('selected');
    if (icon.dataset.lang === language) {
      icon.classList.add('selected');
    }
  });

  // Update message in code editor placeholder
  const codeEditor = document.getElementById('codeEditor');
  codeEditor.placeholder = `Write your code in ${language} here`;
}

// Adds event listeners for language icon clicks
function setupLanguageIconClicks() {
  document.querySelectorAll('.language-icons i').forEach(icon => {
    icon.addEventListener('click', function () {
      const language = this.dataset.lang;
      selectLanguage(language);
    });
  });
}

// Function to handle the execution of code
function executeCode() {
  const codeEditor = document.getElementById('codeEditor');
  const outputSection = document.getElementById('outputSection');
  const data = {
    script: codeEditor.value,
    language: document.querySelector('.language-icons .selected').dataset.lang,
    versionIndex: "0",
    compileOnly: false
  };

  fetch('http://localhost:3000/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    outputSection.textContent = data.output || 'No output returned.';
  })
  .catch(error => {
    console.error('Error:', error);
    outputSection.textContent = `Error in execution: ${error.toString()}`;
  });
}

// Setup event listeners
function setupEventListeners() {
  document.getElementById('runButton').addEventListener('click', executeCode);
  setupLanguageIconClicks();
}

// Initialize the app
function initializeApp() {
  setupEventListeners();
  initializeDefaultLanguage();
}

document.addEventListener('DOMContentLoaded', initializeApp);
