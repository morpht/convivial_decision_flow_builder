const urlParams = new URLSearchParams(window.location.search);
const parameter = urlParams.get('example');

if (parameter) {
  fetch(parameter)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(htmlContent => {
    document.getElementById('htmlInput').value = htmlContent;
    document.getElementById('refreshBtn').click();
  })
  .catch(error => {
    console.error('Error fetching the URL:', error);
  });
}