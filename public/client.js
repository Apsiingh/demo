document.addEventListener('DOMContentLoaded', function() {
  const activateBtn = document.getElementById('activateBtn');
  const buttons = document.querySelectorAll('#buttons button');

  let socket = io();

  activateBtn.addEventListener('click', function() {
      activateBtn.disabled = true;
      document.getElementById('buttons').style.display = 'block';
      socket.emit('activate');
  });

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          if (!button.classList.contains('inactive')) {
              button.classList.add('inactive');
              socket.emit('buttonClick', button.id);
          }
      });
  });

  socket.on('activate', function() {
      activateBtn.disabled = true;
      document.getElementById('buttons').style.display = 'block';
  });

  socket.on('initialState', function(buttonState) {
      for (let buttonId in buttonState) {
          const button = document.getElementById(buttonId);
          if (buttonState[buttonId] === false) {
              button.classList.add('inactive');
          }
      }
  });

  socket.on('buttonClick', function(buttonId) {
      const button = document.getElementById(buttonId);
      if (button) {
          button.classList.add('inactive');
      }
  });
});
