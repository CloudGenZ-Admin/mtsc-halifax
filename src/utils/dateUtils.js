
export const parseEventDate = (dateInput) => {
  if (!dateInput) return null;
  if (dateInput instanceof Date) {
    if (isNaN(dateInput.getTime())) return null;
    return new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate());
  }

  const dateStr = String(dateInput).trim();
  
  // Match YYYY-MM-DD pattern at the start of string
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // 0-indexed month
    const day = parseInt(match[3], 10);
    return new Date(year, month, day);
  }

  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return null;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};


export const formatDate = (dateInput, options = {}) => {
  if (!dateInput) return null;
  const parsed = parseEventDate(dateInput);
  if (!parsed) return null;

  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  return parsed.toLocaleDateString('en-US', defaultOptions);
};


export const formatEventDateForSave = (date) => {
  if (!date) return null;
  if (typeof date === 'string') return date;
  if (isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00.000Z`;
};
