$(document).ready(function () {
  // Mensaje inicial al cargar la página
  $('#chat-history').append('<p>Xylaz...</p>');

  // Determinar baseUrl solo una vez
  const baseUrl = window.location.hostname === 'xylazbot.xyz' ? 'https://xylazbot.xyz' : 'http://localhost:3000';

  // Función para obtener la respuesta del backend (API)
  async function getAIResponse(prompt) {
    try {
      // Realizar la solicitud POST
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }), // Enviar solo el prompt al backend
      });

      // Comprobar si la respuesta es válida
      if (!response.ok) {
        console.error('Error:', response.statusText);
        return 'Hubo un problema con la solicitud. Inténtalo de nuevo.';
      }

      // Parsear y devolver la respuesta
      const data = await response.json();
      return data.response || 'Error en la respuesta del servidor';
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      return 'Ocurrió un error al procesar tu solicitud.';
    }
  }

  // Función para enviar el mensaje
  async function sendMessage() {
    const userMessage = $('#user-input').val().trim(); // Eliminar espacios innecesarios
    if (!userMessage) return; // Si no hay mensaje, no hacer nada

    $('#chat-history').append(`<p class="user-message">You: ${userMessage}</p>`);
    $('#user-input').val(''); // Limpiar el campo de entrada

    $('#chat-history').append('<p class="bot-message">Xylaz is typing...</p>');
    const botResponse = await getAIResponse(userMessage);

    // Reemplazar el mensaje de "Xylaz is typing..." por la respuesta real
    const lastBotMessage = $('#chat-history p.bot-message');
    lastBotMessage.text(`Xylaz: ${botResponse}`);
  }

  // Evento de click en el botón de enviar
  $('#send-button').click(function () {
    sendMessage();
  });

  // Enviar mensaje al presionar Enter
  $('#user-input').keypress(function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evitar que se envíe el formulario
      sendMessage(); // Llamar la misma función
    }
  });
});
