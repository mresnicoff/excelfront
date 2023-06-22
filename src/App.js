import Loader from "./components/Loader";
import axios from "axios";
import React from "react"
import DownLoader from "./components/DownLoader";
import Signin from "./components/Signin";
import CreateAccount from "./components/CreateAccount";
import MyMenu from "./components/MyMenu";
import { Routes, Route, useLocation } from "react-router-dom";
import GrantPermission from "./components/GrantPermission";
import {Text, HStack} from '@chakra-ui/react'
function App() {
const [paginaVisible, setPaginaVisible]=React.useState("Signin")
const [permisos, setPermisos]=React.useState([])
const [usuarios, setUsuarios]=React.useState([])
const [usuarioLogueado, setUsuarioLogueado]=React.useState({})
const leerPermisosyUsuarios= async()=>{
  const misPermisos= await axios.get(`http://localhost:3001/permisos`)
  const misUsuarios= await axios.get(`http://localhost:3001/usuarios`)
  setPermisos(misPermisos.data)
  setUsuarios(misUsuarios.data)
}
const location = useLocation();
React.useEffect(() => {
console.log(location)
if (paginaVisible==="Permisos"){
 leerPermisosyUsuarios()}
},[paginaVisible]);
React.useEffect(() => {
if(localStorage && localStorage.getItem('loggedUser')){
  let usuario=JSON.parse(localStorage.getItem('loggedUser'))
  setUsuarioLogueado(usuario)
}
},[])
  return (
<>
{location.pathname!=="/signin" && location.pathname!=="/signup" && usuarioLogueado.permisosAsignados &&<HStack> <MyMenu setUsuarioLogueado={setUsuarioLogueado} usuarioLogueado={usuarioLogueado} setPaginaVisible={setPaginaVisible}/><Text>{(usuarioLogueado && usuarioLogueado.data && usuarioLogueado.data.Nombre) ? usuarioLogueado.data.Nombre:"invitado"}</Text></HStack>}
<Routes>
<Route exact path="/upload" element={   usuarioLogueado && usuarioLogueado.permisosAsignados && usuarioLogueado.permisosAsignados.find(permiso=>permiso==="Cargar")?<Loader usuarioLogueado={usuarioLogueado}/>: <div>No tienes los permisos para ver esta página. Solicítaselos a Logística.</div> }/>
<Route exact path="/download" element={<DownLoader usuarioLogueado={usuarioLogueado}/>} />
<Route exact path="/signin" element={<Signin setUsuarioLogueado={setUsuarioLogueado}/>} />
<Route exact path="/" element={usuarioLogueado.permisosAsignados?<Loader usuarioLogueado={usuarioLogueado}/>:<Signin setUsuarioLogueado={setUsuarioLogueado}/>} />
<Route exact path="/signup" element={<CreateAccount/>} />
<Route exact path="/permisos" element={   usuarioLogueado && usuarioLogueado.permisosAsignados && usuarioLogueado.permisosAsignados.find(permiso=>permiso==="Logistica")? <GrantPermission permisos={permisos} usuarios={usuarios}/>:    <div>No tienes los permisos para ver esta página. Solicítaselos a Logística.</div> } />
</Routes>

</>)

                }


export default App;
