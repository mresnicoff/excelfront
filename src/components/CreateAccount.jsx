import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Button,
    Container,
    Divider,
    Heading,
    HStack,
    Stack,
    Text,
    useToast
  } from '@chakra-ui/react'
  import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
   
const CreateAccount = () =>{
  const toast = useToast()
  const navigate = useNavigate();
    return (
      <Formik
      initialValues={{ nombre: "", password: "", repeatPassword:"", email:"" }}
      validationSchema={Yup.object({
        nombre: Yup.string()
          .required("Debe ingresar un nombre")
          .min(6, "El nombre es muy corto"),
        password: Yup.string()
          .required("debe ingresar un password")
          .min(6, "la password es muy corta"),
        email: Yup.string().email("email invalido").required("Debe ingresar un email"),
        repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las passwords deben ser iguales')
      })}
      onSubmit={async (values, actions) => {
      try{
        actions.resetForm();
        await axios
        .post(`http://localhost:3001/usuarios/`, values)
        navigate('/')}
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
        
      
      }}}
    >
          {formik => (

    <Container as="form"  maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} onSubmit={formik.handleSubmit}>
      <Stack spacing="8">
        <Stack spacing="6">
  
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'l', md: 'xl' }}>Crear cuenta</Heading>
            <HStack spacing="1" justify="center">
              <Text color="fg.muted">Ya tienes una cuenta?</Text>
              <Button variant="text" size="lg">
              <NavLink to="/signin">Loguéate</NavLink>
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
            <TextField name="nombre" placeholder="ingrese su nombre"/>
            <TextField name="email" placeholder="enter email" type="email" />
            <TextField
            name="password"
            type="password"
            placeholder="enter password"
          />
                      <TextField
            name="repeatPassword"
            type="password"
            placeholder="Repita la clave"
          />
            </Stack>
            <Stack spacing="6">
              <Button type="submit" variant="outline" colorScheme="teal">Registrarse</Button>
              <HStack>
                <Divider />
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
          )}
    </Formik>)
   }
   export default CreateAccount