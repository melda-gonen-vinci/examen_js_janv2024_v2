const HomePage = () => {
  const id = localStorage.getItem('intervalId');
  if (id) clearInterval(id);
  const main = document.querySelector('main');
  main.innerHTML = 'Deal with the content of your HomePage';
};

export default HomePage;
