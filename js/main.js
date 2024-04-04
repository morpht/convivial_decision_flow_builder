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

});

/**
 * Clear existing storage, such as cookies and local storage.
 */
function clearExistingStorage() {
    localStorage.clear();
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}