type HandleMutationErrorParams = {
  error: unknown;
  defaultMessage?: string;
};

export function handleMutationError(
  { error, defaultMessage }: HandleMutationErrorParams,
  callback: (message: string) => void
): void {
  console.error(error);

  let errorMessage =
    defaultMessage ??
    "Erro desconhecido. Por favor, tente novamente mais tarde.";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  callback(errorMessage);
}
