import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const ContainerHeader = styled.View`
    margin: 30px 0px 12px 30px;

    `;

export const TitleHeader = styled.Text`
    font-size: 16px;
    color: #ff0000;
    font-weight: bold;
`;

export const ContainerInput = styled.View`
    width: 80%;
    margin: 12px 0 12px 30px;
`;

export const InputName = styled.TextInput`
font-size: 16px;
padding: 10px;
border: 2px solid;
color: #808080;
border-radius: 3px;
`;

export const CardList = styled.View`
    `;

export const ContainerTitle = styled.View`
width: 100%;
background: red;
align-items: center;
padding: 20px;
`;

export const TextTitle = styled.Text`
font-size: 20px;
color: #fff;
`;

export const Card = styled.TouchableOpacity`
    border: 1px solid;
    padding: 10px;
    color: #ff0000;
`;

export const TextName = styled.Text`
font-size: 20px;
color: #ff0000;
`;

export const ContainerText = styled.View`
flex-direction: row;
`;

export const TextCharacters = styled.Text`
font-size: 20px;
color: #ff0000;
margin-left: 40px;
margin-top: 20px;
`;

export const ButtonMore = styled.TouchableOpacity`
    background: #2F4F4F;
    height: 30px;
`;

export const CardDescription = styled.TouchableOpacity`
    padding: 20px;
    align-items: center;
    justify-content: center;
    background-color: #000000;
    margin: 20px;
    border-radius: 20px;
`;

export const TextDescription = styled.Text`
font-size: 20px;
color: #ff0000;
margin-top: 20px;
`;