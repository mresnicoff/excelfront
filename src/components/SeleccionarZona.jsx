import React from 'react'
import{Select, Stack,RadioGroup, Radio, HStack, VStack, Text, Button,  useToast } from '@chakra-ui/react'
import axios from "axios";

function SeleccionarZona(props) {
   const toast=useToast()
const [value, setValue]=React.useState("uno")
const handleOK= async ()=>{
    if (value==="borrar"){
        const datos=await axios.delete(`http://localhost:3001/datos?zona=${props.zona}`) 
        toast({
            title: 'Éxito',
            position: 'top-center',
            description: "Datos Eliminados",
            status: 'success',
            duration: 2000,
            isClosable: true,
          }) 
          props.setActiveStep(1)
        
        }
}

    return (
<VStack>

{props.hayDatos===false &&<HStack>
    <Text >Seleccione la zona: </Text>
<Select  placeholder='Zona' onChange={props.handleSelectZone}>
            {props.usuarioLogueado.zonasCargar.map(x=>  <option value={x}>{x}</option>)}
        </Select>
</HStack>}
<br/>
{props.hayDatos &&<VStack><Text>Se encuentran datos para la zona seleccionada. Qué quiere hacer?</Text>
    <RadioGroup onChange={setValue} value={value}>
    <Stack direction='row'>
        <Radio value="borrar">Borrar datos existentes</Radio>
        <Radio value='seguir'>Agregar datos</Radio>
      </Stack>
    </RadioGroup>
    <Button colorScheme='green' onClick={handleOK}>OK</Button>
    </VStack>}

</VStack>
    )
}

export default SeleccionarZona