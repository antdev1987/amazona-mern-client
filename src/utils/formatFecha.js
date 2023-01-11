import format from 'date-fns/format'
import { es } from 'date-fns/locale';

const formatFecha = (fecha)=>{

    let date = new Date(fecha)
    const fechaResult = format(date, 'PPP | h:mm aaa')
    
    return fechaResult

}

export default formatFecha