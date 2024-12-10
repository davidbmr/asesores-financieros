export default function extractDate(isoString: string): string {
    // Verificar si el argumento es una cadena válida
    if (typeof isoString !== 'string' || !isoString) {
      return 'Invalid input';
    }
  
    const date = new Date(isoString);
    
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Invalid date format';
    }
  
    // Definir los nombres de los meses
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  
    // Extraer día, mes y año
    const day = date.getDate(); // El día no necesita ser formateado a dos dígitos
    const month = months[date.getMonth()]; // Obtener el nombre del mes
    const year = date.getFullYear(); // Obtener el año completo
  
    return `${month} del ${year}`;
  };