document.addEventListener('DOMContentLoaded', function() {

    clearExistingStorage();

    const refreshBtn = document.getElementById('refreshBtn');
    const htmlInput = document.getElementById('htmlInput');
    const treeOutput = document.getElementById('treeOutput');
    
    refreshBtn.addEventListener('click', function() {
        const htmlCode = htmlInput.value;
        treeOutput.innerHTML = htmlCode;
        
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
});

/**
 * Clear existing storage, such as cookies and local storage.
 */
function clearExistingStorage() {
    localStorage.clear();
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}