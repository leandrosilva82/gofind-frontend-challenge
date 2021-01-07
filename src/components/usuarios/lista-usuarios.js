import { useEffect, useState } from "react";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function ListaUsuarios() {

    const [page, setPage] = useState(0);
    const [usuarios, setUsuarios] = useState({ 'data': [{}] });
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1)
    };

    let getUsuarios = async () => {
        setLoading(true);
        let res = await axios.get("https://reqres.in/api/users",
            { params: { 'page': page } }).then((res) => {
                setUsuarios(res.data);
                setLoading(false);
            });
    }

    useEffect(() => {
        getUsuarios();
    }, [page])

    return (
        <div>
            { loading ? <LinearProgress /> : null}
            <h2>Listagem de Usuários</h2>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell align="right">Nome</TableCell>
                            <TableCell align="right">Sobrenome</TableCell>
                            <TableCell align="right">E-mail</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            usuarios.data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell align="right">{row.first_name}</TableCell>
                                    <TableCell align="right">{row.last_name}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right"><Link to={'/edita-usuario/' + row.id}><EditIcon /></Link></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                colSpan={3}
                                count={usuarios.total | 0}
                                rowsPerPage={usuarios.per_page}
                                page={usuarios.page - 1 | 0}
                                SelectProps={{
                                    inputProps: { 'aria-label': '' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                            />
                        </TableRow>
                    </TableFooter>


                </Table>
            </TableContainer>
        </div>
    );
}
export default ListaUsuarios;