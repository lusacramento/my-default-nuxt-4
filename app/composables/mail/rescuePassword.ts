export const useRescuePassword = () => {
  function generateEmailContent(name: string, token: string) {
    return { html: generateHTML(name, token), text: generateText(name, token) }
  }

  function generateHTML(name: string, url: string) {
    return `
      <html lang="pt-br" dir="ltr">
        <body style="width: 100%; color: rgba(255, 255, 255, 0.8) background-color: #121212">
          <div
            class="main"
            style="justify-content: center; text-align: center; height: 400px"
          >
            <h1 style="margin: 20px">
              Olá ${name}!
            </h1>
            <p>Clique no link abaixo para redefinir sua senha no ${useRuntimeConfig().public.appName }.</p>
            <p>
              <a style="color: brown" href="${url}">
                ${url}
              </a>.
            </p>
          </div>
        </body>
      </html>
    `
  }

  function generateText(name: string, url: string) {
    return `Bem vindo ao ${useRuntimeConfig().public.appName}, ${name}!\n\nCopie o seguinte link e cole em seu navegador para concluir seu cadastro:\n\n${url}`
  }
  return { generateEmailContent }
}