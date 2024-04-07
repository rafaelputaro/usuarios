# usuarios
Usuario sin token:
    Crear cliente.
Usuario con token:
    Rol cliente:
        Eliminar su usuario.
        Obtener usuarios.
        Actualizar su usuario.
    Rol administrador:
        Puede crear y eliminar cualquier tipo de usuario.
        Obtener usuarios.
        Actualizar su usuario.

NOTA: Un usuario cliente no puede pasar a ser administrador y viceversa

# Instrucciones:

Crear el archivo ".env" en la raíz del proyecto con el siguiente contenido.

PORT = 4000
DB_CNN=mongodb+srv://rafaelputaro:LmkwPw5Y2Lgi!3M@cluster0.u58ehpr.mongodb.net/match
SECRET_JWT_SEED=6158103a248014155002dd022d33fcb7@LmkwPw5Y2Lgi!3M

Ejecutar:

docker-compose up --build

