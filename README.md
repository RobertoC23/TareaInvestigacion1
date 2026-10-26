# Chat web en tiempo real con Socket.IO

Proyecto de investigación de Programación 4, Universidad Nacional de Costa Rica.

## Descripción

Aplicación web de mensajería en tiempo real que permite a varios usuarios intercambiar mensajes mediante Socket.IO y un servidor Node.js.

El servidor recibe, valida y distribuye los mensajes a todos los clientes conectados. La interfaz muestra el estado de conexión y permite recuperar la sesión de chat después de interrupciones temporales.

## Tecnologías

- Node.js y JavaScript
- Express
- Socket.IO 4
- HTML5 y CSS3
- Git y GitHub

## Requisitos

- Node.js y npm
- Git
- Navegador web moderno

Entorno utilizado en las pruebas: Node.js 22.14.0 y npm 10.9.2.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/RobertoC23/TareaInvestigacion1.git
cd TareaInvestigacion1
```

Instalar las dependencias:

```bash
npm ci
```

Iniciar el servidor:

```bash
node server/server.js
```

Abrir en el navegador:

http://localhost:3000

Para detener el servidor, presionar Ctrl+C.

## Uso

1. Abrir la aplicación en dos ventanas o navegadores.
2. Ingresar un nombre de usuario diferente en cada cliente.
3. Escribir y enviar mensajes.
4. Comprobar que los mensajes aparecen en ambos clientes.
5. Utilizar el botón Salir para abandonar el chat.

La aplicación no almacena el historial de mensajes.

## Arquitectura

- Cliente: archivos HTML, CSS y JavaScript dentro de public/.
- Servidor HTTP: Express entrega la aplicación al navegador.
- Servidor Socket.IO: procesa conexiones y eventos.
- Distribución: el servidor utiliza io.emit() para enviar mensajes a todos los clientes.

La interfaz principal utiliza el transporte WebSocket de Socket.IO.

## Eventos

### user:join

Cliente a servidor.

```json
{"user":"Ana"}
```

Registra temporalmente al usuario conectado.

### chat:message

Cliente a servidor:

```json
{"text":"Hola"}
```

Servidor a clientes:

```json
{"user":"Ana","text":"Hola","ts":1792989700535}
```

El servidor agrega el usuario registrado y la marca de tiempo.

### system:info

Servidor a cliente:

```json
{"level":"info","msg":"Ana se ha conectado"}
```

También permite comunicar errores de validación.

### user:leave

Servidor a clientes:

```json
{"user":"Ana"}
```

Notifica la salida de un usuario.

## Validaciones

El servidor comprueba que:

- El nombre no esté vacío ni supere 30 caracteres.
- El mensaje no esté vacío ni supere 500 caracteres.
- El usuario esté registrado antes de enviar mensajes.

Los mensajes se muestran como texto para evitar que el navegador interprete etiquetas HTML enviadas por otros usuarios.

## Reconexión

Cuando se interrumpe la comunicación, la interfaz muestra el estado de reconexión y deshabilita temporalmente el envío.

Al recuperar la conexión, el cliente vuelve a registrar automáticamente el nombre del usuario y puede continuar enviando mensajes.

Los mensajes anteriores permanecen visibles en la página abierta, pero no están almacenados en el servidor.

## Estructura principal

```text
TareaInvestigacion1/
|-- public/
|   |-- index.html
|   |-- main.js
|   |-- styles.css
|   `-- test.html
|-- server/
|   `-- server.js
|-- docs/
|   `-- pruebas.md
|-- package.json
|-- package-lock.json
`-- README.md
```

## Pruebas

La página auxiliar de validación se encuentra en:

http://localhost:3000/test.html

El registro de pruebas funcionales se encuentra en docs/pruebas.md.

## Limitaciones

- No existe autenticación de usuarios.
- No hay almacenamiento permanente de mensajes.
- El registro de usuarios se conserva únicamente en memoria.
- No se implementaron salas privadas.
- El entorno local no utiliza TLS; un despliegue público requeriría HTTPS/WSS y controles de seguridad adicionales.
- No hay una suite de pruebas automatizadas configurada.

## Repositorio

https://github.com/RobertoC23/TareaInvestigacion1