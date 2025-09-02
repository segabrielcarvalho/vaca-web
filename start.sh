echo "Esperando o vaca-api ficar disponível"
until nc -z vaca-api 5000; do
  echo "vaca-api ainda down. Aguardando 5 segundos"
  sleep 5
done

echo "vaca-api disponível. Instalando dependências..."
pnpm install

echo "API disponível. Gerando código GraphQL"
pnpm generate

echo "Iniciando vaca-web"
pnpm dev
