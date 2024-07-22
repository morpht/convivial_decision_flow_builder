document.addEventListener('DOMContentLoaded', function () {

    const htmlInput = document.getElementById('htmlInput');
    const refreshBtn = document.getElementById('refreshBtn');
    const treeOutput = document.getElementById('treeOutput');

    htmlInput.addEventListener('input', function () {
        refreshBtn.classList.remove('disabled');
    });

    refreshBtn.addEventListener('click', function () {
        const htmlCode = htmlInput.value;
        treeOutput.innerHTML = htmlCode;
        history.replaceState({}, document.title, window.location.pathname + window.location.search);

        initializeConvivialDecisionFlow(); // Call the function here

    });

    document.querySelectorAll('.dropdown-item.example').forEach(span => {
        span.addEventListener('click', function () {
            switch (this.id) {
                case "simple-example":
                    fetchExamplesFromFile("simple-example", './examples/index.html');
                    break;
                case "bookshop-example":
                    fetchExamplesFromFile("bookshop-example", './examples/bookshop.html');
                    break;
                case "bar-example":
                    fetchExamplesFromFile("bar-example", './examples/bar.html');
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
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
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
            initializeConvivialDecisionFlow();
        })
        .catch(error => console.error('Error fetching HTML file:', error));
}

/**
 * Initialize the ConvivialDecisionFlow after HTML content is loaded
 */
function initializeConvivialDecisionFlow() {
    if (typeof ConvivialDecisionFlow === 'function') {
        const flow = document.querySelector('.convivial-decision-flow');
        if (flow && flow.id) {
            const df = new ConvivialDecisionFlow(localStorage, flow.id, flow);
            df.activate();
            df.initializeForms();
            df._initializeFunctionCalls();
        } else {
            console.warn('Convivial decision flow does not have ID.');
        }
    } else {
        console.warn('ConvivialDecisionFlow class is not defined.');
    }
}
