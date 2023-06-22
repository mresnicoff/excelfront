import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {VStack, Text, HStack, Grid, GridItem, Button, useToast} from '@chakra-ui/react'
function MostrarErrores(props) {
   const navigate=useNavigate()
    const toast=useToast()
   const cargarBorrandoErrores=async()=>{

    try{
await axios.post(`http://localhost:3001/datos/`, props.miCarga)
toast({
    title: 'Éxito',
    position: 'top-center',
    description: "los datos se cargaron con éxito",
    status: 'success',
    duration: 3000,
    isClosable: true,
  })
  navigate("/download")

}
catch(error){console.log(error)
   }}
   const handleVolver=()=>{props.setActiveStep(0)}

    return (
<VStack>

<Grid
    w="80%"
    templateRows={`repeat(${props.errores.length+2}, 1fr)`}
    templateColumns='repeat(10, 1fr)'
    gap={1}
>
<GridItem rowSpan={1} colSpan={10} bg='blue.700' ><Text p="5px" fontSize='xl'>Estos son los errores detectados</Text></GridItem>
<GridItem fontSize='md' rowSpan={1} bg="blue.700" colSpan={2}><Text p="2px" fontSize='l'>Fila</Text></GridItem> <GridItem rowSpan={1} colSpan={3} bg="blue.700"><Text p="2px" fontSize='l'>Matricula</Text></GridItem><GridItem rowSpan={1} colSpan={5} bg="blue.700"><Text p="2px" fontSize='l'>Tipo de Error</Text></GridItem>

    {props.errores.map((error,index) =>  <><GridItem fontSize='md' rowSpan={1}  colSpan={2} bg={index%2===0?'blue.400':'blue.300'}><Text p="2px" fontSize='l'>{error.numero}</Text></GridItem> <GridItem rowSpan={1} colSpan={3} bg={index%2===0?'blue.400':'blue.300'}><Text p="2px" fontSize='l'>{error.matriculas}</Text></GridItem><GridItem rowSpan={1} colSpan={5} bg={index%2===0?'blue.400':'blue.300'}><Text p="2px" fontSize='l'>{error.texto}</Text></GridItem></>
    
    )}
    </Grid>
    <HStack>
    <Button colorScheme='green' onClick={cargarBorrandoErrores}>Grabar borrando filas con error</Button>
    <Button colorScheme='red' onClick={handleVolver}>Cancelar</Button>
    </HStack>    
</VStack>
    )
}

export default MostrarErrores