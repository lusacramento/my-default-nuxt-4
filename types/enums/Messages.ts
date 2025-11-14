export enum Messages {
  BLANK_FORM = "O formulário não pode estar em branco.",
  NAME_NOT_PROVIDER = "Nome não informado.",
  EMAIL_NOT_PROVIDER = "Email não informado.",
  PASSWORD_NOT_PROVIDER = "Senha não informada.",
  REPEAT_PASSWORD_NOT_PROVIDER = "Repetição da senha não informada.",
  MORE_2_CHARS = "Deve conter ao menos 3 caracteres.",
  INCOMPATIBLE_EMAIL_FORMAT = "Formato de email incompatível. Digite um email válido",
  INCOMPATIBLE_PASSWORD_FORMAT = `deve conter ao menos um dígito;\n
    deve conter ao menos uma letra minúscula;\n
    deve conter ao menos uma letra maiúscula;\n
    deve conter ao menos um caractere especial;\n
    deve conter ao menos 8 dos caracteres mencionados.`,
  NAME_ALREADY_EXISTS = "O nome de usuário já existe. Escolha outro.",
  EMAIL_ALREADY_REGISTER = "Este email já está cadastrado. Caso esqueceu a senha, solicite uma nova.",
  SUCCESS_REGISTERED_USER = "Usuário cadastrado com sucesso! Por favor, faça o login.",
  INVALID_CREDENTIALS = "Credenciais Inválidas. Verifique se você digitou os dados corretamente.",
  INVALID_REPEAT_PASSWORD = "As senhas devem ser iguais.",
  SUCESS_LOGIN = "Login realizado com sucesso!",
  SERVER_ERROR = "Houve um erro no servidor. Contacte o suporte.",
  NOT_REGISTERED_EMAIL = "Email não cadastradado.",
  ERROR_TOKEN = "Houve um erro no token de validação. Contacte o suporte.",
  TOKEN_NOT_PROVIDER = "Token não informado.",
  NOT_EQUALS_PASSWORDS = "A senha e sua repetição não são iguais.",
  EMAIL_ERROR = "Não foi possível enviar o email. Contacte o suporte.",
  LOGOUT = "Sessão encerrada com sucesso! Para acessar novamente, faça o login.",
  VERIFIED_USER = "Usuário verificado com sucesso. Faça o login",
  SUCCESS_PUT_PASSWORD = "Senha alterada com sucesso! Faça o login novamente.",
  CONFIRM_PUT_PASSWORD = "Para alterar sua senha, acesse o link enviado no email cadastrado.",
  ID_NOT_PROVIDER = "Id não informado.",
  UPDATED_PASSWORD = "Senha atualizada com sucesso! Faça o login novamente",
  EMAIL_SERVER_ERROR = "Houve um erro ao enviar o email. Contacte o suporte.",
  INSERT_DB_ERROR = "Houve um erro ao inserir no Banco de Dados. Contacte o suporte.",
  CONFIRM_REGISTER="Confirme seu registro através do link que enviamos para seu email.",
  NOT_REGISTER_CONFIRM = "O usuário está registrado, mas não confirmado. Por favor, verifique seu email para confirmar o cadastro.",
  RECOVERY_PASSWORD_EMAIL_SENT = "Verifique a caixa de entrada do seu email para recuperar sua senha. Esta solicitação expira em 10 minutos.",
  EXPIRED_TOKEN = "O token está espirado. Favor, solicitar novo token."
}
