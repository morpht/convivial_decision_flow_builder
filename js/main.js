document.addEventListener('DOMContentLoaded', function() {

    const htmlInput = document.getElementById('htmlInput');
    const refreshBtn = document.getElementById('refreshBtn');
    const clearStorageBtn = document.getElementById('clearStorageBtn');
    const treeOutput = document.getElementById('treeOutput');

    htmlInput.addEventListener('input', function() {
        refreshBtn.classList.remove('disabled');
    });
    
    refreshBtn.addEventListener('click', function() {
        const htmlCode = htmlInput.value;
        treeOutput.innerHTML = htmlCode;
        history.replaceState({}, document.title, window.location.pathname + window.location.search);
        
        if (typeof DecisionTree === 'function') {
            const decisionTree = document.querySelector('#treeOutput .decision-tree');
            if (decisionTree.id) {
                new DecisionTree(decisionTree.id);
            } else {
                console.warn('Decision tree does not have ID.');
            }
        } else {
            console.warn('DecisionTree class is not defined.');
        }
    });

    clearStorageBtn.addEventListener('click', function() {
        clearExistingStorage();
        Swal.fire({
            title: "Decision tree data cleared!",
            text: "localStorage & cookies have been cleared",
            icon: "success"
          });
    });

    document.querySelectorAll('.dropdown-item.example').forEach(span => {
        span.addEventListener('click', function() {
            switch (this.id) {
                case "simple-example":
                    fetchExamplesFromFile("simple-example", './examples/index.html');
                    break;
                case "bookshop-example":
                    fetchExamplesFromFile("bookshop-example", './examples/bookshop.html');
                    break;
            }
        });
    });

});

/**
 * Clear existing storage, such as cookies and local storage.
 */
function clearExistingStorage() {
    localStorage.clear();
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}

/**
 * Function to fetch HTML data from example files and update the UI elements
 *
 * @param {string} id
 * @param {string} filePath
 */
function fetchExamplesFromFile(id, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            htmlInput.value = html;
            treeOutput.innerHTML = html;
            refreshBtn.click();
            refreshBtn.classList.remove('disabled');
        })
        .catch(error => console.error('Error fetching HTML file:', error));
}