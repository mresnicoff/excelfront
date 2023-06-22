import { NavLink, useNavigate } from "react-router-dom";
import React from "react"
import axios from "axios";
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    Heading,
    HStack,
    Stack,
    useToast,
    Text,
  } from '@chakra-ui/react'

  import { Formik } from "formik";
  import * as Yup from "yup";
  import TextField from "./TextField";
   const Signin = (props) =>{
    const navigate = useNavigate();
    const toast = useToast()
    const [isLoading,setIsolading]=React.useState(false)
    const [remember,setRemember]=React.useState(true)
    const handleRemember=()=>{
      console.log("Hola!")
      setRemember(!remember)
 
    }
    return (
      <Formik
      initialValues={{  password: "", email:"" }}
      validationSchema={Yup.object({
        password: Yup.string()
          .required("debe ingresar un password")
          .min(6, "la password es muy corta"),
        email: Yup.string().email("email invalido").required("Debe ingresar un email"),
      })}
      onSubmit={async (values, actions) => {
        try{
          setIsolading(true)

 
         const usuario= await axios
          .get(`http://localhost:3001/usuarios/`, {params: values}
          )
          const permisosId=usuario.data.permisos.map(permiso=>permiso.id)
          console.log(permisosId)
          var carga=0;
          var aprobar=0;
          var zonasCargar=[];
          var zonasAprobar=[];
          var permisosAsignados=[]
          for(let i=0;i<permisosId.length;i++){
           console.log( permisosId[i][2])
            if(permisosId[i][2]==="C"){
              if (carga===0){permisosAsignados.push("Cargar")
              carga=1 }
            zonasCargar.push(usuario.data.permisos[i].zona)
              }
              if(permisosId[i][2]==="A"){
                if (aprobar===0){permisosAsignados.push("Aprobar")
                aprobar=1 }
              zonasAprobar.push(usuario.data.permisos[i].zona)
                }
                if(permisosId[i][2]==="G"){
            permisosAsignados.push("Logistica")
                  }}
          usuario.permisosAsignados=permisosAsignados
          usuario.zonasCargar=zonasCargar
          usuario.zonasAprobar=zonasAprobar
          props.setUsuarioLogueado(usuario)
          if(remember){
            console.log(remember)
          window.localStorage.setItem("loggedUser", JSON.stringify(usuario));}
          actions.resetForm();
          navigate('/upload')}
          catch (error){
            console.log(error)
            toast({
              title: 'Error.',
              position: 'top-center',
              description: error.response.data.message,
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            actions.resetForm();
              setIsolading(false)
      
        
        
        }}}

    >
                {formik => (
    <Container as="form" maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}  onSubmit={formik.handleSubmit}>
      <Stack spacing="8">
        <Stack spacing="6">
  
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'l', md: 'xl' }}>Loguearse</Heading>
            <HStack spacing="1" justify="center">
              <Text color="fg.muted">No tienes una cuenta?</Text>
              <Button variant="text" size="lg">
              <NavLink to="/signup">Regístrate</NavLink>
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
            <TextField name="email" placeholder="ingrese su email" type="email" />
            <TextField
            name="password"
            type="password"
            placeholder="Ingrese su Password"
          />
  
            </Stack>
            <HStack justify="space-between">
              <Checkbox
defaultChecked checked={formik.values.check} onChange={handleRemember }>Recuerdame</Checkbox>
              <Button variant="text" size="sm">
                Olvidó su clave?
              </Button>
            </HStack>
            <Stack spacing="6">
            <Button  isLoading={isLoading} type="submit" variant="outline" colorScheme="teal">Loguearse</Button>
              <HStack>
                <Divider />
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
                )}
    </Formik>
  )
   }
   export default Signin