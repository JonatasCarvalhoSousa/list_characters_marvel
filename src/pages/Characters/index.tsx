import React, {useCallback, useEffect, useState} from 'react';
import { ScrollView, Dimensions, Image, Button, Modal } from 'react-native';
import api from '../../services/api';
import {
    Container, 
    ContainerHeader, 
    InputName, 
    ContainerInput, 
    CardList, 
    ContainerTitle, 
    TextTitle, 
    Card, 
    TitleHeader, 
    TextName, 
    ContainerText,
    TextCharacters,
    ButtonMore,
    CardDescription} from './styles';
import ResponseData from '../../components/Config/configData';
import { TextDescription } from '../../components/styles';
import ResponseSeries from '../../components/Config/configSeries';
import ResponseEvent from '../../components/Config/configEvents';
import Detalhes from '../../components/Detalhes';

const {width, height} = Dimensions.get("window")

const Characters: React.FC = () => {
    const [info, setInfo] = useState<ResponseData[]>([]);
    const [characters, setCharacters] = useState<ResponseData[]>([]);
    const [text, setText] = useState("");
    const [descriptionId, setDescriptionId] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      api
        .get('/characters', {
            params: {
                limit: 10,
            }
        })
        .then(async response => {
            let fullCharacters = [];

            let series = await getSeries(response.data.data.results[0].id)
            let events = await getEvents(response.data.data.results[0].id)
            
            fullCharacters.push({...characters, ...series, ...events})
            setCharacters(fullCharacters);

        })
       
      .catch(err => console.log('log error', err));     
    }, []);

    const getSeries = async (id) => {
            let response = await api.get(`/characters/${id}/series`, {
                params: {
                    limit: 3,
                }
            })
            return response;
        }

    const getEvents = async (id) => {
        let response = await api.get(`/characters/${id}/events`, {
            params: {
                limit: 3,
            }
        })
            return response;
        }
    
    useEffect(() => {
        if(text){
            fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${text}&ts=1652743521572&apikey=dfec76eec21988918668a81c32ee52b2&hash=54d0307efbd5da9593623b71bfa8d049`)
                .then((response) => response.json())
                .then((response) => {

                    let fullCharacters = [];

                    let series = getSeries(response.data.data.results[0].id)
                    let events = getEvents(response.data.data.results[0].id)
                    
                    fullCharacters.push({...characters, ...series, ...events})
                    setInfo(fullCharacters);
                });
        }
    }, [text]);

    const handleMore = useCallback(async () => {
        try{
            const offset = characters.length;
            const response = await api.get('characters', {
                params: {
                    offset,
                },
            });
            setCharacters([... characters, ... response.data.data.results]);
        } catch (err) {
            console.log(err);
        }
    }, [characters]);

    return(
        <Container>
            <ContainerHeader>
                <TitleHeader>Lista de personages da marvel</TitleHeader>
            </ContainerHeader>
            <ContainerInput>
                <TextName>Busque pelo seu personagem aqui:</TextName>
                    <InputName
                        style={{height: 40}}
                        placeholder="Digite aqui nome do seu personagem..."
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={text}
                        onChangeText={(value) => setText(value)}
                    />
            </ContainerInput>
                <ContainerTitle>
                    <TextTitle>Personagens: </TextTitle>
                </ContainerTitle>
                <ScrollView>
                {info &&(
                    <CardList>
                     {info.map(info => {
                         return (
                            <Card onPress={() => {setVisible(true)}} key={info.id}>
                                <Image style={{width: 70,height: 70, marginLeft: 40}} source={{uri: `${info.thumbnail.path}.${info.thumbnail.extension}`}} />
                                    <ContainerText>                                
                                        <TextCharacters>{info.name}</TextCharacters>         
                                        <TextCharacters>{info.series.title}</TextCharacters>                                 
                                        <TextCharacters>{info.series.title}</TextCharacters>                                 
                                    </ContainerText>
                            </Card>
                         )
                    })}
                    </CardList>
                )}
            <CardList>
                {characters.map(characters => {
                    return (
                        <Card onPress={() => {setVisible(true)}} onPressIn={()=> setDescriptionId(characters.id)} key={characters.id}>
                                    <Image style={{width: 70,height: 70, marginLeft: 40}} source={{uri: `${characters.thumbnail.path}.${characters.thumbnail.extension}`}} />
                                    <TextCharacters>Nome:</TextCharacters>
                                    <TextCharacters>{characters.name}</TextCharacters>
                                    <TextCharacters>{characters.series.title}</TextCharacters>
                                    <TextCharacters>{characters.events.title}</TextCharacters>
                        </Card>
                )})}
                    
            </CardList>    
                </ScrollView>
                <Button onPress={handleMore} title='Mais'/>

            {visible &&             
                <Modal 
                animationType='slide'
                transparent={true}
                visible={visible}
                >
                <Detalhes characters={characters.map(characters => {return characters})} voltar={ ()=> setVisible(false)}/>
                
            </Modal>}
        </Container>
    )
}

export default Characters;
