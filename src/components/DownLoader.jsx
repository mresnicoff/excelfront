import React from 'react';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import {VStack, Center, HStack, Heading, Select, Text, Grid, GridItem, Button} from '@chakra-ui/react'


export const DownLoader =  (props) => {
  function ExcelDateToJSDate(date) {
    const fecha= new Date(Math.round((date - 25569)*86400*1000))
    var month = fecha.getUTCMonth() + 1
    var year = fecha.getUTCFullYear();
    return`${month}-${year}`
  }
  const [zona, setZona]=React.useState('')
  const [misDatos, setMisDatos]=React.useState([])
  const getData= async(zona) => {

    const datos=await axios.get(`http://localhost:3001/getdatos?zona=${zona}`)
  return datos.data}


const handleSelectZone= async(e)=>{
  console.log(e.target.value)
  const estosDatos=await getData(e.target.value)
  setZona(e.target.value)
  setMisDatos(estosDatos)
}
  
    const exportToCSV = async (zona) => {
      const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
      const fileName="download"
const apiData=await getData(zona)
    if(apiData.length){
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }};

  return (
    <VStack>
    <Center>
    <Heading m="30px" >Haga Click en Exportar para bajar los pedidos a Excel</Heading>
    </Center>


<HStack>
    <Text >Seleccione la zona: </Text>
<Select  placeholder='Zona' onChange={handleSelectZone}>
            {props.usuarioLogueado.zonasCargar.map(x=>  <option value={x}>{x}</option>)}
        </Select>
</HStack>
    <Button colorScheme='green' onClick={(e) => exportToCSV(zona)}>Export</Button>
    <Grid
    w="80%"
    templateRows={`repeat(${misDatos?misDatos.length+2:2}, 1fr)`}
    templateColumns='repeat(10, 1fr)'
    gap={1}
>
<GridItem rowSpan={1} colSpan={10} bg='blue.700' ><Text p="5px" fontSize='xl'>{`Consumo de la zona: ${zona}`}</Text></GridItem>
<GridItem fontSize='md' rowSpan={1} bg="blue.700" colSpan={2}><Text p="2px" fontSize='l'>Matricula</Text></GridItem> <GridItem rowSpan={1} colSpan={3} bg="blue.700"><Text p="2px" fontSize='l'>Cantidad</Text></GridItem><GridItem rowSpan={1} colSpan={5} bg="blue.700"><Text p="2px" fontSize='l'>Mes</Text></GridItem>

    {misDatos.length && misDatos.map((fila,index) =>  <><GridItem fontSize='md' rowSpan={1}  colSpan={2} bg={index%2===0?'blue.400':'blue.300'}><Text p="2px" fontSize='l'>{fila.matriculas}</Text></GridItem> <GridItem rowSpan={1} colSpan={3} bg={index%2===0?'blue.400':'blue.300'}><Text p="2px" fontSize='l'>{fila.cantidades}</Text></GridItem><GridItem rowSpan={1} colSpan={5} bg={index%2===0?'blue.400':'blue.300'}><Text p="2px" fontSize='l'>{ExcelDateToJSDate(fila.mes)}</Text></GridItem></>
    
    )}
    </Grid>


    </VStack>
  );
};
export default DownLoader