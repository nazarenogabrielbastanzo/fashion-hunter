# Fashion Hunter - Frontend

Este es el repositorio frontend del grupo c4-05-m del programa NoCountry.

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Demo:

https://fashion-hunter-27637.web.app/

## Uso:

1. Clonar el repositorio:
    ```sh
    git clone https://github.com/No-Country/c4-05-m.git
    ```
2. Sincronizar una rama nueva en local `frontend-prod` con la rama remota `origin/frontend-prod`:
    ```sh
    git checkout -b frontend-prod origin/frontend-prod
    ```
3. Moverse a la carpeta del proyecto y luego al folder /Frontend:
    ```sh
    cd c4-05-m/Frontend
    ```
4. Instalar los paquetes necesarios:
    ```sh
    npm install
    ```
5. En la carpeta src/environments crear un archivo con el nombre "environment.local.ts" con el contenido real de cada variable, lo cual es privado.
    
6. Correr el siguiente npm script (no utilizar npm start, ni ng serve):
    ```sh
    npm run local
    ```
7. Abrir el navegador en:
    ```sh
    http://localhost:4200/
    ```
