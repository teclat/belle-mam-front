# Use a imagem oficial do Node.js com Alpine como base
FROM node:18.10.0-alpine AS builder

# Configura o timezone
ENV TZ="America/Sao_Paulo"
ENV PYTHON=/usr/bin/python3

# Atualiza os pacotes e instala as ferramentas necessárias
RUN apk update && \
    apk add --no-cache tzdata \
    python3 \
    make \
    g++ && \
    cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia apenas os arquivos essenciais para instalar as dependências
COPY package.json yarn.lock ./

# Instala as dependências do projeto
RUN yarn install --frozen-lockfile

# Copia o restante do código do projeto para o diretório de trabalho
COPY . .

# Expõe a porta que será usada pela aplicação
EXPOSE 80

# Define o comando padrão para iniciar a aplicação
CMD ["yarn", "dev"]
