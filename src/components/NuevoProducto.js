import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Actions de Redux
import {crearNuevoProductoAction} from '../actions/productoActions';
import {mostrarAlerta, ocultarAlertaAction} from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

    //State del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    //Utilizar useDispatch y crea una función
    const dispatch = useDispatch();

    //Acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    //Mandar a llamar el action de Producto Action
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));

    //Función del submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        //Validar Formulario
        if(nombre.trim() === '' || precio <= 0){

            const alerta = {
                msg: 'Ops, Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }

            dispatch(mostrarAlerta(alerta));

            return;
        }

        //Si no hay errores
        dispatch(ocultarAlertaAction());

        //Crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        //Redireccionar
        history.push('/');
    }

    return ( 
        <div className="row justify-content-center mt-4">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-5 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p>: null}

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;
