export const formatSoloFecha = (fechaCompleta?: string): string => {
    if (!fechaCompleta || typeof fechaCompleta !== 'string') {
      return ''; // Devuelve una cadena vacía si no hay fecha o el tipo no es correcto
    }
  
    const [fecha] = fechaCompleta.split(',');
    return fecha ? fecha.trim() : ''; // Devuelve la fecha sin la hora, si existe
  };
  