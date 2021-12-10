const Tarea = require("./tarea");
const colors = require("colors");

class Tareas {
    _listado = {
        'abc': 123
    };


    get listadorArr(){
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        })

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []){
        
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc)

        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        for (let i = 0; i < this.listadorArr.length; i++) {
            let estado = "Pendiente".red;
            const desc = this.listadorArr[i]["desc"];
            const id = colors.green(i+1+". ")
            
            if(this.listadorArr[i]["completadoEn"]){
                estado = "Completado".green;
            }
            console.log(`${id + desc} :: ${estado}`)
        }
    }

    listarPendientesCompletadas(completadas = true){
        if(completadas){
            for (let i = 0; i < this.listadorArr.length; i++) {
                if(this.listadorArr[i]['completadoEn']){
                    let completadoEn = this.listadorArr[i]['completadoEn'].green;
                    const desc = this.listadorArr[i]["desc"];
                    const id = colors.green(i+1+". ")
                    console.log(`${id + desc} :: ${completadoEn}`)
                }
            }
        }else {
            for (let i = 0; i < this.listadorArr.length; i++) {
                if(!this.listadorArr[i]['completadoEn']){
                    let estado = "Pendiente".red;
                    const desc = this.listadorArr[i]["desc"];
                    const id = colors.green(i+1+". ")
                    console.log(`${id + desc} :: ${estado}`)
                }
            }
        }
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadorArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });


    }
}


module.exports = Tareas;