export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: any = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Europe/Paris'
  };
  
  const formattedDate = date.toLocaleDateString('fr-FR', options);

  return formattedDate
}

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  const options: any = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Paris'
  };
  
  const formattedDate = date.toLocaleDateString('fr-FR', options);

  return formattedDate
}