<?php
include('../../db/DB.php');

$class_cliente = new cliente($conexion);
$datos = isset($datos) ? $datos : '[]';
print_r($class_cliente->$accion($datos));

class cliente{
    private $datos=[], $db;
    public $respuesta = ['msg'=>'correcto'];

    public function cliente($db=''){
        $this->db = $db;
    }
    public function recibir_datos($cliente=''){
        $this->datos = json_decode($cliente, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty(trim($this->datos['codigo'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo';
        }
        if( empty(trim($this->datos['nombre'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre';
        }
        if( empty(trim($this->datos['direccion'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese la direccion';
        }
        if( empty(trim($this->datos['telefono'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese el telefono';
        }
        if( empty(trim($this->datos['dui'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese el dui';
        }
    }
    private function almacenar_datos(){

        if($this->respuesta['msg'] == -correcto){

            if ($this->datos['accion']=='nuevo'){
                $this->db->consultas('INSERT INTO clientes(codigo, nombre ,direccion, telefono, dui) VALUES (?,?,?,?,?) ',
                   $this->datos['codigo'],$this->datos['nombre'],$this->datos['direccion'],
                   $this->datos['telefono'],$this->datos['dui']                               
                ) ;
                  
            } else if ($this->datos['accion']=='modificar'){
                $this->db->consultas('UPDATE clientes SET codigo=?,nombre=?, direccion=?,telefono=?,dui=? WHERE idCliente=?'                  
                   $this->datos['codigo'],$this->datos['nombre'],$this->datos['direccion'],
                   $this->datos['telefono'],$this->datos['dui']                  
                );
                return $this->datos['idCliente'];

            }else if ($this->datos['accion']=='eliminar'){

                $this->db->consulta('DELETE FROM clientes WHERE idClientes=?, $this->datos['idCliente']') //captura 1
                return $this->datos['idCliente'];

            }

        } else {
            return $this->respuesta;
        }


        
    }
}
?>