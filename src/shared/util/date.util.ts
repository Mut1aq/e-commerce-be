export const formattedDateForConsole = () =>
  new Date(Date.now()).toLocaleString(undefined, {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: '2-digit',
    month: '2-digit',
  });

export const nYearsAgo = (years: number) =>
  new Date(
    new Date(
      new Date().setFullYear(new Date().getFullYear() - years),
    ).toISOString(),
  );
