/* eslint-disable react/prop-types */
import axios from 'axios'
import Swal from 'sweetalert2'

function BotonEmpataron(props){
    const {texto, clase, equipo} = props

    const alerta = () => {
        Swal.fire({
            title: "Actualizar equipo",
            text: "Estás seguro de agregar un partido empatado?",
            icon: "question",
            showDenyButton: true,
            denyButtonText: 'Cancelar',
            confirmButtonText: 'Sí',

        }).then(respuesta => {
            if(respuesta.isConfirmed){
                handleActualizarPuntos()
                Swal.fire({text: "El equipo se actualizó correctamente", icon:"success"})
            }
        }) 
    }

    const handleActualizarPuntos = () => {
        const nuevoPuntos = equipo.puntos + 1;
        const nuevoPartidoJugado = equipo.partidos_jugados +1;
        const nuevoPartidoEmpatado = equipo.partidos_empatados + 1;

        axios.patch(`http://localhost:3005/api/equipos/${equipo.id}`,
            {
                puntos: nuevoPuntos,
                partidos_jugados: nuevoPartidoJugado,
                partidos_empatados: nuevoPartidoEmpatado
            })
            .then(response => {
                // Actualizar el estado o realizar cualquier acción adicional después de la actualización exitosa
                console.log('Puntos actualizados correctamente:', response.data);
            })
            .catch(error => {
                // Manejar cualquier error que ocurra durante la petición
                console.error('Error al actualizar los puntos:', error);
            });
    };
    return(
        <button className={clase} type="button" onClick={alerta}>{texto}</button>
    )
}

export default BotonEmpataron