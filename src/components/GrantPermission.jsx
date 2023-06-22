import React from 'react'
import { Heading,Center,Grid, GridItem, VStack, HStack, Select, Button, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
function GrantPermission(props) {
    const toast=useToast()
    const [user, setUser] = React.useState("");
    const [checked, setChecked] = React.useState([]);
    const handleUser=(e)=>{
        setUser(e.target.value)
    }
  
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };

      const submitPermissions=async()=>{
    try{       
        const data={}
        if(user===""){
             toast({
                title: 'Error.',
                position: 'top-center',
                description: "Debe seleccionar un usuario",
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
              return
        }
        data.user=user
        data.permisos=checked
        const permisos=  await axios
        .post(`http://localhost:3001/asignarpermisos/`, data)
        toast({
            title: 'Exito.',
            position: 'top-center',
            description: "Se han cargado los permisos satisfactoriamente",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        
}
catch{}
            }
  return (<VStack>
            <Center>
        <Heading m="30px" >Darle permisos a un usuario</Heading>
        </Center>
    <HStack alignItems="top">

    <Grid
        w="80%"
        templateRows={`repeat(${props.permisos.length+1}, 1fr)`}
        templateColumns='repeat(10, 1fr)'
        gap={1}
>
<GridItem rowSpan={1} colSpan={10} bg='blue.700' ><Text p="5px" fontSize='xl'>Seleccione los permisos a asignar</Text></GridItem>


        {props.permisos.map((permiso,index) =>  <><GridItem fontSize='md' rowSpan={1} color="blue.800" colSpan={9} bg={index%2===0?'blue.300':'blue.200'}><Text p="2px" fontSize='l'>{permiso.rol}</Text></GridItem> <GridItem rowSpan={1} colSpan={1} bg={index%2===0?'blue.300':'blue.200'}><Text p="2px" fontSize='l'><input onChange={handleCheck} type="checkbox" value={permiso.id}/></Text></GridItem></>
        
        )}
        </Grid>
        <Select w="40%" placeholder='Usuario' onChange={handleUser}>
            {props.usuarios.map(x=>  <option value={x.email}>{x.Nombre}</option>)}
        </Select>
        <Button onClick={submitPermissions}>OK</Button>
        </HStack>
       
        </VStack>)


    
}

export default GrantPermission