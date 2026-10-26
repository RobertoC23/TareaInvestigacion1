# Registro de pruebas funcionales

## Proyecto

Chat web en tiempo real con Node.js, Express y Socket.IO.

## Entorno utilizado

- Sistema operativo: Windows
- Node.js: 22.14.0
- npm: 10.9.2
- Servidor: localhost:3000
- Método: pruebas manuales con clientes web

## Resultados

| ID | Prueba | Resultado |
|---|---|---|
| P-01 | Conexión de dos clientes | Aprobada |
| P-02 | Envío y recepción de mensajes | Aprobada |
| P-03 | Comunicación bidireccional | Aprobada |
| P-04 | Desconexión y reingreso | Aprobada |
| P-05 | Reinicio del servidor | Aprobada tras corrección |
| P-06 | Registro automático al reconectar | Aprobada |
| P-07 | Rechazo de mensajes inválidos | Aprobada |
| P-08 | Rechazo de usuario no registrado | Aprobada |
| P-09 | Rechazo de nombre demasiado largo | Aprobada |
| P-10 | Indicador visual de reconexión | Aprobada |
| P-11 | Visualización segura de etiquetas HTML | Aprobada |

## Incidencia detectada: reconexión

Al reiniciar el servidor, los clientes recuperaban la conexión, pero no podían continuar enviando mensajes.

Causa: el servidor almacena los usuarios en memoria. Después del reinicio, esa información se pierde.

Corrección: se agregó el registro automático del usuario mediante el evento connect y se limpió el usuario al salir voluntariamente.

Resultado: los clientes pudieron continuar enviando y recibiendo mensajes después de reiniciar el servidor.

## Mejora del indicador visual

Se agregó un indicador con estados conectado, reconectando y desconectado, junto con la deshabilitación temporal de botones cuando no existe conexión.

Se verificó visualmente el cambio entre conectado y reconectando durante las pruebas.

## Visualización segura

Se reemplazó la inserción de mensajes mediante innerHTML por la creación de nodos de texto.

El mensaje de prueba con etiquetas HTML se mostró literalmente, sin interpretarse como formato.

## Validaciones del servidor

Se verificaron respuestas de error para:

- Mensajes vacíos.
- Mensajes superiores al límite permitido.
- Usuarios no registrados.
- Nombres superiores a 30 caracteres.

## Evidencias

Las capturas deben incorporarse al documento final:

1. Dos usuarios intercambiando mensajes.
2. Indicador de reconexión.
3. Mensaje HTML mostrado de manera segura.
4. Validación de mensajes incorrectos.

## Alcance

Estas pruebas son manuales. Los resultados no equivalen a una auditoría integral de seguridad, rendimiento o compatibilidad.