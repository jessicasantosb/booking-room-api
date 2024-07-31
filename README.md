# Booking Room API

Esta API fornece endpoints para gerenciar usuários e reservas de quartos. Ela permite que você registre e faça login de usuários, crie, leia e cancele reservas, e permite que o administrador adicione quartos.

## Endpoints
Você pode visualizar a API em [Live Preview](https://booking-room-backend.vercel.app/)

### **POST /api/users/register**
- **Descrição**: Cria um usuário.
### **POST /api/users/login**
- **Descrição**: Retorna o login de um usuários.

### **GET /api/rooms**
- **Descrição**: Retorna uma lista de todos os quartos.
### **GET /api/rooms/:roomid**
- **Descrição**: Retorna detalhes de um quarto específico.

### **POST /api/books**
- **Descrição**: Cria uma nova reserva.
### **GET /api/books/:userid**
- **Descrição**: Retorna uma lista de todas as reservas do usuário.
### **PUT /api/books/:roomid/:bookingid**
- **Descrição**: Atualiza o status de uma reserva para cancelado.

### **GET /api/admin/bookings**
- **Descrição**: Retorna uma lista de todas as reservas.
### **GET /api/admin/rooms**
- **Descrição**: Retorna uma lista de todos os quartos.
### **GET /api/admin/users**
- **Descrição**: Retorna uma lista de todos os usuários.
### **POST /api/admin/room**
- **Descrição**: Retorna o registro de um quarto.

## Technology Stack

- NodeJS
- MongoDB
- Bcrypt
- Stripe

## Author

Created by Jessica Bandeira.

- LinkedIn: [Jessica's LinkedIn Profile](https://www.linkedin.com/in/jessicasantosb/)

## Known Issues and Future Improvements

[Português]

- Mencione quaisquer problemas conhecidos ou limitações.
- Esboce seus planos para melhorias futuras.

[English]

- Mention any known issues or limitations.
- Outline your plans for future improvements.