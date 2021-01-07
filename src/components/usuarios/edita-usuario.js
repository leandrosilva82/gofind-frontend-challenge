import './edita-usuario.css'
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 400,
        },
    },
}));

export default function EditaUsuario() {
    let { id } = useParams();
    const { register, handleSubmit, errors } = useForm();
    const [usuario, setUsuario] = useState({ first_name: '', last_name: '', email: '' });
    const [openDialogResultado, setOpenDialogResultado] = useState({ status: '', open: false, msg: '' });
    const [loading, setLoading] = useState(false);

    let carregaUsuario = async () => {
        setLoading(true);
        let res = await axios.get("https://reqres.in/api/users/" + id).then((res) => {
            setUsuario(res.data.data);
            setLoading(false);
        });
    }

    let gravaUsuario = async () => {
        setLoading(true);
        await axios.put("https://reqres.in/api/users/" + id,
            {
                params: {
                    first_name: usuario.first_name,
                    last_name: usuario.last_name,
                    email: usuario.email
                }
            }
        ).then((res) => {
            let mensagem = res.status === 200 ?
                'Os dados foram gravados com sucesso!' :
                'Ocorreu o erro ' + res.status + ' ao gravar os dados do usuário. Tente novamente ou entre em contato com o suporte técnico.'
            setOpenDialogResultado({ status: res.status, open: true, msg: mensagem });
            setLoading(false);
        });
    }

    const handleCloseDialogResultado = () => {
        setOpenDialogResultado({ ...openDialogResultado, open: false });
    };

    useEffect(() => {
        carregaUsuario();
    }, [])

    function onSubmit() {
        gravaUsuario();
    }

    return (
        <div>
            { loading ? <LinearProgress /> : null}
            <h2>Edição de Usuário</h2>
            <div className="usuario-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="inputNome">Nome</label>
                    <input
                        type="text"
                        id="inputNome"
                        name="first_name"
                        value={usuario.first_name}
                        ref={register({ required: "Campo obrigatório", })}
                        onChange={e => {
                            setUsuario({ ...usuario, first_name: e.target.value });
                        }}
                    />
                    {errors.first_name && <p className="error">{errors.first_name.message}</p>}

                    <label htmlFor="inputSobreNome">SobreNome</label>
                    <input
                        type="text"
                        id="inputSobreNome"
                        name="last_name"
                        value={usuario.last_name}
                        ref={register({ required: "Campo obrigatório", })}
                        onChange={e => {
                            setUsuario({ ...usuario, last_name: e.target.value });
                        }}
                    />
                    {errors.last_name && <p className="error">{errors.last_name.message}</p>}

                    <label htmlFor="inputEmail">E-mail</label>
                    <input
                        type="email"
                        id="inputEmail"
                        name="email"
                        value={usuario.email}
                        ref={register({
                            required: "Campo obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Informe um e-mail válido",
                            },
                        })}
                        onChange={e => {
                            setUsuario({ ...usuario, email: e.target.value });
                        }}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}

                    <button type="submit" className="submit" autoFocus disabled={loading}>Gravar</button>
                    <Link to='/lista-usuarios'><button type="button" className="back">Voltar</button></Link>
                </form>
            </div>
            <Dialog
                open={openDialogResultado.open}
                onClose={handleCloseDialogResultado}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={(openDialogResultado.status === 200 ? 'dialogTitleSuccess' : 'dialogTitleError')} >{"Edição de usuário"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {openDialogResultado.msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogResultado} color="primary">
                        Ok
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}