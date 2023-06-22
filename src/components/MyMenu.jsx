import { NavLink, useNavigate } from "react-router-dom";
import {
    Menu,
    Button,
    MenuButton,
    MenuList,
    useColorMode,
    MenuItem,

  } from '@chakra-ui/react'
  import { ChevronDownIcon } from '@chakra-ui/icons'

function MyMenu(props) {
  const signOut=()=>{props.setUsuarioLogueado({})
  window.localStorage.removeItem("loggedUser");
  navigate('/signin')}
  const navigate=useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const openPermissions=()=>{ 
    props.setPaginaVisible("Permisos")
    navigate('/permisos')}
return(
<Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    Menu
  </MenuButton>
  <MenuList>
    <MenuItem><NavLink to="/download">DownLoad</NavLink></MenuItem>
    {props.usuarioLogueado && props.usuarioLogueado.permisosAsignados && props.usuarioLogueado.permisosAsignados.find(permiso=>permiso==="Cargar") &&<MenuItem><NavLink to="/upload">UpLoad</NavLink></MenuItem>}
    {!props.usuarioLogueado || !props.usuarioLogueado.data? <MenuItem><NavLink to="/signin">Sign In</NavLink></MenuItem>:    <MenuItem><button onClick={signOut}>
      Sign Out
      </button></MenuItem>}
   {props.usuarioLogueado && props.usuarioLogueado.permisosAsignados && props.usuarioLogueado.permisosAsignados.find(permiso=>permiso==="Logistica") && <MenuItem><button onClick={openPermissions}>Asignar Permisos</button></MenuItem>}
    <MenuItem><button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </button></MenuItem>
  </MenuList>
</Menu>)}
export default MyMenu