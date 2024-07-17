const treeOutput = document.getElementById('treeOutput');

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {

        const localStorageData = document.getElementById('local-storage-data');
        const cookiesData = document.getElementById('cookies-data');

        const ConvivialDecisionFlow = document.querySelector('#treeOutput .convivial-decision-flow');
        if (ConvivialDecisionFlow.id) {
            $(localStorageData).JSONView(localStorage.getItem(ConvivialDecisionFlow.id));
            const cookieValue = getCookie('outcome');
            if (cookieValue) $(cookiesData).JSONView({ "outcome": cookieValue });
        } else {
            console.warn('Convivial decision flow does not have ID.');
        }
    });
});

const config = { attributes: true, childList: true, subtree: true };
observer.observe(treeOutput, config);

/**
 * Retrieve value from cookies
 */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
