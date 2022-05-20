import React, {} from 'react';
import {Button, Image} from 'react-native'
import { Container, ContainerText, TextDescription } from './styles';

export default function Detalhes(props){

    return(
        <Container>
            <Image style={{width: 70,height: 70, marginLeft: 40}} source={{uri: `${props.characters.thumbnail.path}.${props.characters.thumbnail.extension}`}} />
                <ContainerText>                                
                </ContainerText>
                    <TextDescription>Detalhes:</TextDescription>                            
                    <TextDescription>{props.characters.description}</TextDescription>                            
                
                <Button title='Voltar' onPress={ props.voltar }/>

        </Container>
    )
}