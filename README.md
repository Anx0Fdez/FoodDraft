<p align="center">
  <img src="src/images/Logo.png" alt="Logo" width="80">
</p>

<div align="center">

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Taildwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Clerk](https://img.shields.io/badge/Clerk-indigo?style=for-the-badge&logo=clerk&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Shadcn](https://img.shields.io/badge/shadcn-%23FF0000.svg?style=for-the-badge&logo=shadcn&logoColor=white)

</div>

<div align="center">


[![Descargar Informe](https://img.shields.io/badge/Descargar%20Informe-pdf-red?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](informe.pdf)


</div>

## Instalación en Local

Para configurar el proyecto, sigue estos pasos:

1. Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd FoodDraft
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Crea un archivo `.env.local` en la raíz del proyecto con las siguientes claves:
    ```typescript
    CLERK_PUBLIC_KEY=your_public_key
    CLERK_PRIVATE_KEY=your_private_key

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/feed
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/feed

    DATABASE_URL=database_url_here
    SPOONACULAR_API_KEY= your_spoonacular_api_key
    ```

5. Creacion de la base de datos en local:
   
   Lanza el script de creacion de la base de datos: `create_database.sql`
    ```bash
    psql -U postgres -f create_database.sql
    ```


>[!IMPORTANT]
> Asegúrate de reemplazar `your_public_key` y `your_private_key` con tus claves de Clerk correspondientes.


6. Inicia el servidor de desarrollo:
   
    ```bash
    npm run dev
    cloudflared tunnel --url http://localhost:3000
    ```

>[!NOTE]
> Durante la etapa de desarrollo, si usas cloudflared, actualiza el webhook de Clerk para que apunte a la URL dinámica de cloudflared. Puedes hacerlo desde la consola de Clerk, en la sección de Webhooks.

