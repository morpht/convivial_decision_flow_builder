$(document).ready(function () {
    var refreshBtn = $('#refreshBtn');
    var htmlInput = $('#htmlInput');
    var treeOutput = $('#treeOutput');
    
    refreshBtn.on('click', function() {
        var htmlCode = htmlInput.val();
        treeOutput.html(htmlCode);
        
        if (typeof DecisionTree === 'function') {
            // Initialize the decision tree when the Refresh button is pressed.
            $('#treeOutput .decision-tree').each(function() {
                if ($(this).attr('id')) {
                    new DecisionTree($(this).attr('id'));
                } else {
                    console.warn('Decision tree does not have ID.');
                }
            });
        } else {
            console.warn('DecisionTree class is not defined.');
        }
    });
});