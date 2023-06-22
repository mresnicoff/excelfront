import React from 'react'

import {VStack} from '@chakra-ui/react'
function Board(props) {
    const drop = e => {

        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');

        const card = document.getElementById(card_id);
        card.style.display = 'block';
        e.target.appendChild(card);
        console.log(e.target.id)
        props.setColumnas((prevColumnas => ({
            ...prevColumnas,
            [e.target.id]:props.tarjeta 
        })))   
        console.log(props.columnas)
    }


    const dragOver = e => {
        e.preventDefault();
    }

    return (
<VStack w="20%" bg={props.bg? props.bg:'blue.400'} color="white"
            id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}
        >

            {props.children}
</VStack>
    )
}

export default Board