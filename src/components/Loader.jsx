import axios from "axios";
import React from "react";
import Board from './Board'
import MyStepper from './MyStepper'
import SeleccionarZona from './SeleccionarZona'
import MostrarErrores from './MostrarErrores'
import Card from './Card'
import {
  Button,
  useSteps,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Text,
  HStack,
  Input,
  Flex,
  useToast
} from '@chakra-ui/react'
import * as XLSX from "xlsx";

const steps = [
  { title: '1ro', description: 'Seleccione la zona a cargar' },
  { title: '2do', description: 'Seleccione Archivo y hoja' },
  { title: '3ro', description: 'Mapear columnas' },
  { title: '4to', description: 'Ver Errores' },
]  
function Loader(props) {
  const toast = useToast()
  const [tabIndex, setTabIndex] = React.useState(0);
  const [zona, setZona] = React.useState("");
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const inputRef = React.useRef(null);
  const [data, setData] = React.useState([]);
  const [columnas,setColumnas]=React.useState({matriculas:"",mes:"",cantidades:""})
  const [tarjeta,setTarjeta]=React.useState("Hola")
  const [hayDatos, setHayDatos]=React.useState(false)
  const [workSheetNames, setWorkSheetNames] = React.useState([]);
  const [errores, setErrores]=React.useState([])
  const [miCarga, setMiCarga]=React.useState([])
  

  const handleSelectZone=async(e)=>{setZona(e.target.value)
    const datos=await axios.get(`http://localhost:3001/getdatos?zona=${e.target.value}`) 
  if (datos.data.length){
setHayDatos(true)}
else{setActiveStep(1)}}
  
  const handleOK=(e)=>{
    if(data.length>0){
      setActiveStep(2)}
      else{
      toast({
      title: 'Error.',
      position: 'top-center',
      description: "Debes seleccionar un archivo",
      status: 'error',
      duration: 3000,
      isClosable: true,
    })}
 }
  
  const handleReset = (e) => {
    inputRef.current.value = null;
    setData([])
    setWorkSheetNames([])
  }
  const handleOK2= async(e)=>{
  console.log(columnas)
if (columnas.mes==="" || columnas.matriculas==="" || columnas.cantidades==="")
{      toast({
  title: 'Error.',
  position: 'top-center',
  description: "Debe mapear la columnas mes, cantidades y matrículas",
  status: 'error',
  duration: 3000,
  isClosable: true,
})
return}
setActiveStep(3)
let cargar=[]
let myError=[]
console.log(data[tabIndex].length)
for (let i=0;i<data[tabIndex].length;i++){
let filaCargar={}
let filaError={}
filaCargar.matriculas=data[tabIndex][i][columnas.matriculas.slice(7)]
const re= /0\d{3}-\d{4}/
const re2=/\d{3}-\d{4}/
if (!re.test(filaCargar.matriculas)){
  if(re2.test(filaCargar.matriculas)){filaCargar.matriculas=0+filaCargar.matriculas}
  else{
filaError.matriculas=filaCargar.matriculas
filaError.numero=i
filaError.texto="Error en la matrícula"
myError.push(filaError)
  }
}
if (re.test(filaCargar.matriculas)){
console.log(zona)
filaCargar.mes=data[tabIndex][i][columnas.mes.slice(7)]
filaCargar.cantidades=data[tabIndex][i][columnas.cantidades.slice(7)]
filaCargar.zona=zona
cargar.push(filaCargar)}



// console.log(data[tabIndex][0][columnas.matriculas.slice(7)])
// console.log(columnas.matriculas.slice(7))

}
setErrores(myError)
setMiCarga(cargar)
console.log(myError)}

  const handleVolver=(e)=>{setActiveStep(0)}

  const handleFileUpload = (e) => {
   
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      let sheetName
      let sheet
      let parsedData=[]
      const myFile = e.target.result;
      const workbook = XLSX.read(myFile, { type: "binary" });
      setWorkSheetNames (workbook.SheetNames)
      for(let i=0;i<workbook.SheetNames.length;i++){
        sheetName = workbook.SheetNames[i];
        sheet = workbook.Sheets[sheetName];
        parsedData[i] = XLSX.utils.sheet_to_json(sheet);
      setData(...data, parsedData);}
    };
  }



  return (

    <> 
    <Text fontSize='xl' p="20px">Carga de Necesidades de la Zona</Text> 
    <MyStepper activeStep={activeStep} steps={steps}/>
    <>    
    {activeStep===0 && <SeleccionarZona zona={zona} setActiveStep={setActiveStep} hayDatos={hayDatos}handleSelectZone={handleSelectZone} usuarioLogueado={props.usuarioLogueado}/>}
    {activeStep===1 &&( <>   <HStack spacing='24px' my="30px">
      <Button colorScheme='red' onClick={handleReset}>Reset</Button>
      <Button colorScheme='green' onClick={handleOK}>OK</Button>
      <Input ref={inputRef}  placeholder='Outline' type='file' accept=".xlsx, .xls"  onChange={handleFileUpload} />
    </HStack>

<Tabs variant='soft-rounded' colorScheme='green' onChange={(index) => {
          setTabIndex(index); }}>
  <TabList>
    {workSheetNames.map((name)=>(   <Tab>{name}</Tab>))}
  </TabList>

   
    {data.length > 0 && (
   <TabPanels>  
  {data.map((sheet1)=>(<TabPanel>
    {sheet1.length &&(
    <table className="table">
        <thead>
            <tr>
              {Object.keys(sheet1[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheet1.slice(0,10).map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>)}</TabPanel>))} 

      <TabPanel>
 
        </TabPanel>
      
  
   
    </TabPanels>)}

</Tabs>
   </> )}
  </>
{activeStep===2 && (<>    <div className="App">
<center>
<HStack><Text fontSize='lg' p="20px">Mapea las columnas encontradas contra las necesarias</Text>      <Button colorScheme='green' onClick={handleOK2}>OK</Button>      <Button colorScheme='red' onClick={handleVolver}>Volver</Button>

</HStack>
</center>
<Flex flexDirection="row" justifyContent="space-around">

    <Board bg="green" id="board-1" className="board" tarjeta={tarjeta}>
        <center><h3>Columnas encontradas</h3></center>
        {Object.keys(data[tabIndex][0]).map((key) => (       <Card setTarjeta={setTarjeta} color="black" id={`card_id${key}`} className="card" draggable="true"> <p>{key}</p></Card>))}
  
    </Board>

    <Board id="matriculas" className="board "tarjeta={tarjeta} setColumnas={setColumnas}>
    <center><h3>Matricula</h3></center>
    </Board>
    <Board id="mes" className="board " tarjeta={tarjeta} setColumnas={setColumnas}>
    <center><h3>Mes</h3></center>
    </Board>
    <Board id="cantidades" className="board " tarjeta={tarjeta} setColumnas={setColumnas} columnas={columnas}>
    <center><h3>Cantidad</h3></center>
    </Board>
    </Flex>
</div></>)}
{activeStep===3 && <MostrarErrores miCarga={miCarga} setActiveStep={setActiveStep} errores={errores} />}
</>  )
                }


export default Loader;