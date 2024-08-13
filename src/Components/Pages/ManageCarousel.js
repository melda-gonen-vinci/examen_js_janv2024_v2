import Navigate from '../Router/Navigate';

const ManageCarousel = () => {
  const id = localStorage.getItem('intervalId');
  if (id) clearInterval(id);
  displayForm();
}
function displayForm () {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const form = document.createElement('form');
    form.id = 'intervalForm';

    form.innerHTML = `
    <div class="mb-3">
        <label for="interval" class="form-label">Interval (ms)</label>
        <input type="number" class="form-control" id="interval" name="interval" value="5000" required>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    `;

    form.addEventListener('submit', handleFormSubmit);

    main.appendChild(form);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const intervalValue = document.getElementById('interval').value;
    localStorage.setItem('quoteDisplayInterval', intervalValue);

    Navigate('/quotecarousel');
}

export default ManageCarousel;