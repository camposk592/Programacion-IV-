Vue.component('registro',{
    data:()=>{
        return {
            buscar:'',
            registros:[],
            registro:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                idRegistro : '',
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                dui: '',
                fecha: ''
            }
        }
    },
    methods:{
        buscandoRegistro(){
            this.obtenerRegistros(this.buscar);
        },
        eliminarRegistro(registro){
            if( confirm(`Esta seguro de eliminar el registro ${registro.nombre}?`) ){
                this.registro.accion = 'eliminar';
                this.registro.idRegistro = registro.idRegistro;
                this.guardarRegistro();
            }
            this.nuevoRegistro();
        },
        modificarRegistro(datos){
            this.registro = JSON.parse(JSON.stringify(datos));
            this.registro.accion = 'modificar';
        },
        guardarRegistro(){
            this.obtenerRegistros();
            let registros = JSON.parse(localStorage.getItem('registros')) || [];
            if(this.registro.accion=="nuevo"){
                this.registro.idRegistro = generarIdUnicoFecha();
                registros.push(this.registro);
            } else if(this.registro.accion=="modificar"){
                let index = registros.findIndex(registro=>registro.idRegistro==this.registro.idRegistro);
                registros[index] = this.registro;
            } else if( this.registro.accion=="eliminar" ){
                let index = registros.findIndex(registro=>registro.idRegistro==this.registro.idRegistro);
                registros.splice(index,1);
            }
            localStorage.setItem('registros', JSON.stringify(registros));
            this.nuevoRegistro();
            this.obtenerRegistros();
            this.registro.msg = 'Registro procesado con exito';
        },
        obtenerRegistros(valor=''){
            this.registros = [];
            let registros = JSON.parse(localStorage.getItem('registros')) || [];
            this.registros = registros.filter(registro=>registro.nombre.toLowerCase().indexOf(valor.toLowerCase())>-1);
        },
        nuevoRegistro(){
            this.registro.accion = 'nuevo';
            this.registro.msg = '';
            this.registro.idRegistro = '';
            this.registro.codigo = '';
            this.registro.nombre = '';
            this.registro.direccion = '';
            this.registro.telefono = '';
            this.registro.dui = '';
            this.registro.fecha = '';
        }
    },
    created(){
        this.obtenerRegistros();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carRegistro">
                <div class="card-header bg-primary">
                    Registro de Alumnos
                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carRegistro" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarRegistro" @reset="nuevoRegistro">
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="registro.codigo" pattern="[0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Nombre:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el nombre" v-model="registro.nombre" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Direccion:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese la direccion" v-model="registro.direccion" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Telefono:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el tel" v-model="registro.telefono" pattern="[0-9]{4}-[0-9]{4}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">DUI:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el DUI" v-model="registro.dui" pattern="[0-9]{8}-[0-9]{1}" required type="text" class="form-control">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col col-md-2">Fecha:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese la fecha" v-model="registro.fecha" required pattern="{0000-00-00}"  type="date" class="form-control form-control-sm">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="registro.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ registro.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-2">
                            <div class="col col-md-5 text-center">
                                <input class="btn btn-success" type="submit" value="Guardar">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card text-white" id="carBuscarRegistro">
                <div class="card-header bg-primary">
                    Busqueda de Alumnos
                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarRegistro" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoRegistro" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>DIRECCION</th>
                                <th>TEL</th>
                                <th>DUI</th>
                                <th>FECHA</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in registros" @click='modificarRegistro( item )' :key="item.idRegistro">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.direccion}}</td>
                                <td>{{item.telefono}}</td>
                                <td>{{item.dui}}</td>
                                <td>{{item.fecha}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarRegistro(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});