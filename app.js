require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
            pausa,
            leerInput,
            listadoTareasBorrar,
            confirmar,
            mostrarListadoCheckList
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async() => {

    console.log('Hola Mundo');
    let opt = '';
    const tareas = new Tareas;

    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ')
                tareas.crearTarea(desc)
                
                break;
        
            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadorArr)
                tareas.toggleCompletadas(ids)
                console.log(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadorArr);
                
                if(id !== '0'){
                    const ok = await confirmar('¿Esta seguro?')
                    if(ok){
                        tareas.borrarTarea(id)
                        console.log('Tarea Borrada')
                    }
                }


                break;
            default:
                break;
        }

        guardarDB(tareas.listadorArr)

        await pausa();

    } while (opt !== '0');


    // pausa();
}



main();